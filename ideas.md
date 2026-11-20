# Ideias para o BR Pizza

## Fila com Redis para processar fotos do cardápio

Hoje, o cadastro do produto espera o upload da foto para o Cloudinary. Com BullMQ e Redis, o cadastro pode retornar com a imagem em processamento. Um worker gera a miniatura, envia a imagem ao Cloudinary e atualiza o produto com a URL.

Se o upload falhar, o worker tenta novamente. Quando as tentativas se esgotarem, o painel mostra a falha e permite reprocessar a imagem.

**O que praticar** — separação entre produtor e worker, configuração de tentativas e idempotência para evitar efeitos duplicados ao executar o mesmo trabalho novamente.

**Demonstração** — desligar o worker, cadastrar um produto e mostrar que a imagem é processada assim que o worker volta.

## WebSocket para atualizar a fila da cozinha em tempo real

Quando `PUT /order/send` confirmar o envio para preparo, a API emite um evento via Socket.IO. Quando `PUT /order/finish` confirmar a finalização, a API emite outro evento. Cada conexão entra em uma sala associada ao `user_id` validado a partir do JWT para receber apenas os eventos daquele usuário.

Ao receber um evento, o painel consulta novamente a página atual de pedidos pendentes. Assim, a lista e o total de páginas refletem o estado salvo na API. O painel também repete a consulta ao reconectar para recuperar as mudanças ocorridas durante a desconexão.

**O que praticar** — autenticação de conexões, salas, emissão de eventos após a gravação e sincronização após reconexão.

**Demonstração** — abrir duas abas, finalizar um pedido em uma delas e ver a fila atualizar na outra sem recarregar a página.
