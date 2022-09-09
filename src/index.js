import express from "express";
import route from "./routes.js";

const server = express();

//Configuração da aplicação
server.use(express.json());
server.use(express.urlencoded({extended: true}));

//Configuração de rotas
server.use(route);

//Inicializando o servidor na rota 5000
server.listen(5000, () => {
    console.log("Executando aplicação na porta 5000\nhttp://localhost:5000");
});