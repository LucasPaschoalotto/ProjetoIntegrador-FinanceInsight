import { Router } from "express";
import controllerRoutes from "./controller.routes.js";

const rota = Router()


//Rota inicial do projeto ao subir o servidor
rota.get("/", (req, res) => {
    res.sendFile("index.html", {root: './src'});
});

//ROTA CREATE USUARIO
rota.post("/usuario", controllerRoutes.criarUsuario);

//ROTA READ ALL USERS
rota.get("/usuario", async (req, res) => {
    const usuarios = await controllerRoutes.findAllUsers();
    res.status(200).send(usuarios);
});

//ROTA UPDATE

//ROTA DELETE

export default rota;