import { Router } from "express";
import controllerRoutes from "./controller.routes.js";

const rota = Router()


//Rota inicial do projeto ao subir o servidor
rota.get("/", (req, res) => {
    res.sendFile("index.html", {root: './src'});
});

//ROTA CREATE USUARIO
rota.post("/users", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const uuid = await controllerRoutes.createUser(username, password);
    res.status(200).send(uuid);
});

//ROTA READ ALL USERS
rota.get("/users", async (req, res) => {
    const users = await controllerRoutes.findAllUsers();
    res.status(200).send(users);
});

//ROTA UPDATE

//ROTA DELETE

export default rota;