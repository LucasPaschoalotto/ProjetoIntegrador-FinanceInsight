import { Router } from "express";
import controllerRoutes from "./controller.routes.js";

const rota = Router()

//Rota inicial do projeto ao subir o servidor
rota.get("/", (req, res) => {
    res.sendFile("index.html", {root: './src/public'});
});
rota.get("/index.js", (req, res) => {
    res.sendFile("index.js", {root: './src/public'});
});
rota.get("/classes/Usuario.js", (req, res) => {
    res.sendFile("Usuario.js", {root: './src/classes'});
});

//ROTA CREATE USUARIO
rota.post("/users", async (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const cpf = req.body.cpf;
    const user = await controllerRoutes.createUser(nome, email, cpf);
    res.status(200).send(user);
});

//ROTA READ ALL USERS
rota.get("/users/getAllUsers", async(req, res) => {
    const getUsers = await controllerRoutes.findAllUsers();
    res.status(200).send(getUsers);
});

//ROTA READ BY NAME
rota.get("/users/getByUser", async(req, res) => {
    try{
        const nome = req.body.nome;
        const email = req.body.email;
        const cpf = req.body.cpf;
        const getUserName = await controllerRoutes.findByUser(nome, email, cpf);
        //if(!getUserName) return res.sendStatus(400);
        res.status(200).send(getUserName);
    } catch(error){
        console.log("erro no retorno do usuário por Nome");
    }    
})

//ROTA UPDATE BY NAME
rota.put("/users/updateByName", async(req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const cpf = req.body.cpf;
    const newNome = req.body.nome;
    const newEmail = req.body.email;
    const newCpf = req.body.cpf;
    await controllerRoutes.updateUser(nome, email, cpf, newNome, newEmail, newCpf);
    res.status(200).send();
});

//ROTA DELETE
rota.delete("/users/deleteUser", async(req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const cpf = req.body.cpf;
    await controllerRoutes.deleteUser(nome, email, cpf);
    res.status(200).send();
});

export default rota;