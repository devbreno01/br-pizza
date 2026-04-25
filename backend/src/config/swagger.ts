import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Br Pizza",
      version: "1.0.0",
      description: "Documentação da API Br Pizza",
    },
    servers: [
      {
        url: "http://localhost:3333",
      },
    ],
  },
  apis: ["./src/routes.ts", "./src/controllers/**/*.ts"], 
};

export const swaggerSpec = swaggerJsdoc(options);