# BR Pizza

BR Pizza é um sistema de gestão interna para pizzarias que atendem por mesa. O painel web reúne o cadastro de categorias e produtos do cardápio e permite à equipe administrativa acompanhar os pedidos enviados à cozinha. A API também oferece as operações de abertura de pedidos, inclusão e remoção de itens e envio para preparo.

## Regras de negócio

### Usuários e permissões

- O cadastro exige nome com pelo menos 3 caracteres, e-mail válido e único e senha com pelo menos 6 caracteres. A senha é armazenada como hash com bcrypt.
- Novos usuários recebem o perfil `STAFF`. O login verifica as credenciais e emite um JWT com validade de 30 dias. O painel web exige o perfil `ADMIN`.
- Na API, criar categorias, cadastrar produtos e excluir produtos exige `ADMIN`. As demais operações protegidas exigem autenticação.

### Vínculo dos dados com o usuário

- A API usa o ID do JWT para associar novas categorias e pedidos ao usuário autenticado. Produtos herdam o vínculo pela categoria, e itens, pelo pedido.
- As listagens, os detalhes e as alterações usam o mesmo vínculo. Ao incluir um item, tanto o pedido quanto a categoria do produto devem pertencer ao usuário autenticado.
- Categorias e pedidos anteriores à migração ficam com `user_id` nulo. Eles e os registros que dependem deles só aparecem após a atribuição explícita a um usuário.

### Cardápio

- Cada produto pertence a uma categoria. O nome da categoria, o nome do produto e sua descrição devem ter pelo menos 3 caracteres.
- A imagem do produto é obrigatória. A API aceita JPEG ou PNG de até 5 MiB, envia o arquivo ao Cloudinary e grava a URL retornada no banco.
- O painel envia o preço em centavos no campo textual `price` do formulário. A API converte o campo em número e o persiste em uma coluna decimal. Na exibição, o painel divide o valor por 100 e formata em reais. Por exemplo, `4590` é exibido como R$ 45,90.
- O catálogo geral permite filtrar pela flag `disabled`. A consulta por categoria e a inclusão de itens em pedidos consideram apenas produtos ativos (`disabled: false`). A exclusão de produto remove o registro e é bloqueada pelo banco se houver itens vinculados.

### Pedidos

- O fluxo começa com um pedido vinculado ao número da mesa, normalmente com `draft: true` e `status: false`. A criação via API exige os dois indicadores no corpo e aceita um nome de cliente opcional.
- Cada item registra o produto e a quantidade em um pedido existente. Inclusão e remoção são operações independentes. Para excluir um pedido com itens, é preciso removê-los antes por causa da chave estrangeira.
- Enviar à cozinha grava o nome do cliente e define `draft: false`. Finalizar grava o nome recebido e define `status: true`. Essas operações atualizam os indicadores de forma independente. A API atualmente permite finalizar um pedido ainda em rascunho.
- O painel lista os pedidos com `draft: false` e `status: false`. O detalhe exibe os itens, as quantidades e o total calculado pela soma de preço × quantidade. No painel é possível consultar e finalizar pedidos. A abertura, a edição dos itens e o envio para a cozinha estão disponíveis pela API.

## Tecnologias

| Área | Tecnologias e uso |
| --- | --- |
| Frontend | Next.js 16 com App Router, React 19 e TypeScript. Tailwind CSS 4 e componentes shadcn/ui com Base UI para a interface. |
| Backend | Node.js, Express 5 e TypeScript. Zod para validar entradas, bcryptjs para senhas e jsonwebtoken para sessões. |
| Persistência | PostgreSQL 15 no ambiente Docker Compose, Prisma 7 como ORM e migrações SQL versionadas. |
| Imagens | Multer recebe o upload em memória e o Cloudinary hospeda as imagens. |
| Documentação da API | OpenAPI 3 gerado com swagger-jsdoc e servido pelo Swagger UI. |

## Rotas do frontend

| Rota | Acesso | Comportamento |
| --- | --- | --- |
| `/` | Público | Página inicial provisória. |
| `/register` | Público | Cadastro de usuário. Após o sucesso, encaminha para `/login`. |
| `/login` | Público | Inicia a sessão. Usuários autenticados são encaminhados para `/dashboard`. |
| `/access-denied` | Público | Exibe a mensagem de acesso negado. |
| `/dashboard` | `ADMIN` | Lista pedidos pendentes enviados à cozinha. Permite consultar o detalhe e finalizar o pedido. |
| `/dashboard/categories` | `ADMIN` | Lista e cadastra categorias. |
| `/dashboard/products` | `ADMIN` | Lista, cadastra e exclui produtos. Aceita `page` e `limit` na URL, com valores padrão 1 e 6. |

O layout compartilhado do painel consulta a sessão via `GET /me`. Se a sessão não puder ser validada, redireciona para `/register`. Se o perfil for `STAFF`, redireciona para `/access-denied`. Sair do painel remove o cookie de sessão e redireciona para `/login`.

## Rotas do backend

As rotas são montadas na raiz da API. Envie o cabeçalho `Authorization: Bearer <token>` nas rotas autenticadas. As entradas listadas abaixo usam JSON no corpo, exceto quando a tabela indica formulário multipart.

| Método | Rota | Acesso | Operação e entrada |
| --- | --- | --- | --- |
| GET | `/docs` | Público | Abre o Swagger UI. |
| POST | `/user` | Público | Cadastra usuário com `name`, `email` e `password`. |
| POST | `/session` | Público | Autentica com `email` e `password` e retorna o JWT em `autenticate.token`. |
| GET | `/me` | Autenticado | Retorna os dados e o perfil do usuário atual. |
| POST | `/category` | `ADMIN` | Cadastra categoria com `name`. |
| GET | `/categories` | Autenticado | Lista as categorias. |
| POST | `/products` | `ADMIN` | Cadastra produto via `multipart/form-data` com `name`, `price`, `description`, `category_id` e `file`. |
| GET | `/products` | Autenticado | Lista produtos por nome em ordem crescente. Aceita `page` (padrão 1), `limit` (padrão 10) e `disabled=true\|false` na consulta. |
| DELETE | `/products/:id` | `ADMIN` | Exclui o produto identificado por `:id`. Retorna `401` se faltar um token válido ou a permissão administrativa e `400` se a exclusão falhar. |
| GET | `/category/product/:category_id` | Autenticado | Lista os produtos ativos da categoria informada. |
| POST | `/orders` | Autenticado | Cria um pedido com `table`, `draft`, `status` e `name` opcional. |
| GET | `/orders` | Autenticado | Lista os pedidos com seus itens. Aceita o filtro `draft=true\|false` na consulta. |
| POST | `/order/add` | Autenticado | Adiciona um item com `order_id`, `product_id` e `amount`. |
| DELETE | `/order/remove/:id` | Autenticado | Remove o item identificado por `:id`. |
| GET | `/order/detail/:id` | Autenticado | Consulta o pedido identificado por `:id`, incluindo os itens. |
| PUT | `/order/send` | Autenticado | Envia o pedido à cozinha com `order_id` e `name`. |
| PUT | `/order/finish` | Autenticado | Finaliza o pedido com `order_id` e `name`. |
| DELETE | `/order/:id` | Autenticado | Exclui o pedido identificado por `:id`. |

Em `GET /products`, a lista vem em `data.list`. A resposta também inclui `page`, `limit` e `totalPages`. O total de páginas usa os mesmos filtros de usuário e de `disabled` que a lista.

## Decisões técnicas e padrões

- **Princípio da Responsabilidade Única (Single Responsibility Principle, SRP).** No backend, os controllers lidam com a requisição e a resposta HTTP, os services executam os casos de uso e o Prisma acessa o banco. Por exemplo, em `POST /order/add`, o schema valida o formato da entrada, o controller extrai os campos e o service verifica se o pedido existe e se o produto está ativo antes de persistir o item.
- **Organização por domínio e composição de middlewares.** Usuários, categorias, produtos e pedidos têm controllers e services próprios. O roteador Express compõe autenticação, autorização e validação conforme a necessidade de cada operação. O middleware de autenticação verifica o JWT, e o de autorização consulta o perfil do usuário quando a rota exige acesso administrativo.
- **Integridade no banco e validação na entrada.** Zod verifica tipos e campos obrigatórios nas rotas que usam o middleware de validação. As chaves estrangeiras do PostgreSQL mantêm os vínculos entre categoria e produto e entre item, produto e pedido. O índice único de e-mail mantém a unicidade mesmo com cadastros concorrentes.
- **Renderização no servidor e interação no cliente.** O layout e as páginas do App Router podem consultar dados no servidor. Componentes interativos cuidam de formulários, modais e da fila de pedidos. Server Actions encaminham cadastro, login e alterações no cardápio para a API. O cliente HTTP em `frontend/src/lib/api.ts` centraliza a URL base, o cabeçalho Bearer e o tratamento dos erros HTTP.
- **Sessão web e API desacopladas.** O Next.js guarda o JWT em um cookie `HttpOnly`, com `Secure` em produção. A API valida o token recebido via Bearer. O fluxo atual de pedidos passa o token aos componentes cliente que consultam e finalizam pedidos diretamente na API.
- **Imagens fora do banco.** O Multer recebe a imagem em memória e o serviço de produtos a envia por stream ao Cloudinary. O PostgreSQL armazena a URL da imagem junto aos demais dados do produto.

## Executar localmente

Use Node.js 22 LTS (22.12 ou superior), npm e Docker com Compose. Para testar o cadastro de produtos, configure também uma conta Cloudinary.

Crie `backend/.env` com as variáveis abaixo. A URL do banco corresponde ao serviço de desenvolvimento em `backend/docker-compose.yml`. Substitua o segredo do JWT e os valores do Cloudinary antes do uso.

```dotenv
PORT=3333
DATABASE_URL=postgresql://user:secret@localhost:5435/brpizza
JWT_SECRET=seu_segredo_local
CLOUDNARY_CLOUD_NAME=seu_cloud_name
CLOUDNARY_API_KEY=sua_api_key
CLOUDNARY_API_SECRET=seu_api_secret
```

A partir da raiz do repositório, inicie o banco e a API.

```bash
cd backend
docker compose up -d
npm ci
npx prisma migrate deploy
npx prisma generate
npm run dev
```

Crie `frontend/.env.local` com a URL da API.

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:3333
```

Em outro terminal, a partir da raiz do repositório, inicie o frontend.

```bash
cd frontend
npm ci
npm run dev
```

O frontend fica em `http://localhost:3000` e o Swagger em `http://localhost:3333/docs`. Para acessar o painel no ambiente local, cadastre um usuário em `/register` e altere seu campo `role` para `ADMIN` no banco local. O repositório não inclui seed administrativo.

## Status do projeto

O projeto está em desenvolvimento.

## Próximos passos

- Ampliar a cobertura de indicadores de carregamento nos formulários.
- Levar os filtros da API para a interface de produtos.
- Avaliar o uso de TanStack Query nas consultas feitas no cliente.
