import express from "express";
import rota from "./route/routes.js";

const server = express();

//Configuração da aplicação
server.use(express.json());
server.use(express.urlencoded({extended: true}));

//Configuração de rotas
server.use(rota);

export default server;