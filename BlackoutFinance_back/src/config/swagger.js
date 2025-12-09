import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blackout Finance API",
      version: "1.0.0",
      description: "API de controle financeiro (auth, despesas, receitas e dashboard financeiro)",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Servidor local",
      },
      {
        url: "https://blackout-finance-api.onrender.com",
        description: "Servidor produção",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  // AQUI está o ponto crítico
  apis: ["./src/routes/*.js"],
});
