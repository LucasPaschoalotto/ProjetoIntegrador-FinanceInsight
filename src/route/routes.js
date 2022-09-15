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
    const user = await controllerRoutes.createUser(username, password);
    res.status(200).send(user);
});

//ROTA READ ALL USERS
rota.get("/users/getAllUsers", async(req, res) => {
    const getUsers = await controllerRoutes.findAllUsers();
    res.status(200).send(getUsers);
});

//ROTA READ BY NAME
rota.get("/users/getByName", async(req, res) => {
    try{
        const username = req.body.username;    
        const getUserName = await controllerRoutes.findByName(username);
        //if(!getUserName) return res.sendStatus(400);
        res.status(200).send(getUserName);
    } catch(error){
        console.log("erro no retorno do usuário por Nome");
    }    
})

//ROTA UPDATE BY NAME
rota.put("/users/updateByName", async(req, res) => {
    const username = req.body.username;
    const newUsername = req.body.newUsername;
    await controllerRoutes.updateUser(username, newUsername);
    res.status(200).send();
});

//ROTA DELETE
rota.delete("/users/deleteUser", async(req, res) => {
    const username = req.body.username;
    await controllerRoutes.deleteUser(username);
    res.status(200).send();
});

export default rota;