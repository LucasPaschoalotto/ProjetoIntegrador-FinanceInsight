import { Router } from "express";
import controllerRoutes from "./controller.routes.js";

const rota = Router()

//Rota inicial do projeto ao subir o servidor e envio de arquivos necessários
rota.get("/", (req, res) => {
    res.sendFile("index.html", {root: './src/public'});
});
rota.get("/index.js", (req, res) => {
    res.sendFile("index.js", {root: './src/public'});
});
rota.get("/index.css", (req, res) => {
    res.sendFile("index.css", {root: './src/public'});
});
rota.get("/classes/Usuario.js", (req, res) => {
    res.sendFile("Usuario.js", {root: './src/classes'});
});
rota.get("/classes/Transacao.js", (req, res) => {
    res.sendFile("Transacao.js", {root: './src/classes'});
});
rota.get("/classes/Renda.js", (req, res) => {
    res.sendFile("Renda.js", {root: './src/classes'});
});
rota.get("/classes/Despesa.js", (req, res) => {
    res.sendFile("Despesa.js", {root: './src/classes'});
});
rota.get("/classes/Saldo.js", (req, res) => {
    res.sendFile("Saldo.js", {root: './src/classes'});
});
rota.get("/classes/Html.js", (req, res) => {
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

//ROTA CREATE RENDA
rota.post("/users/renda", async (req, res) => {
    const id_usuario = req.body.id_usuario;
    const valor = req.body.valor;
    const descricao = req.body.descricao;
    const renda = await controllerRoutes.createRenda(id_usuario, valor, descricao);
    res.status(200).send(renda);
});

//ROTA CREATE DESPESA
rota.post("/users/despesa", async (req, res) => {
    const id_usuario = req.body.id_usuario;
    const valor = req.body.valor;
    const descricao = req.body.descricao;
    const despesa = await controllerRoutes.createDespesa(id_usuario, valor, descricao);
    res.status(200).send(despesa);
});

//ROTA CREATE SALDO
rota.post("/users/saldo", async (req, res) => {
    const id_usuario = req.body.id_usuario;
    const renda = req.body.renda;
    const despesa = req.body.despesa;
    const saldo = req.body.saldo;
    const saldoFinal = await controllerRoutes.createSaldo(id_usuario, renda, despesa, saldo);
    res.status(200).send(saldoFinal);
});


//ROTA READ ALL USERS
rota.get("/users/getAllUsers", async(req, res) => {
    const getUsers = await controllerRoutes.findAllUsers();
    res.status(200).send(getUsers);
});

//ROTA READ ALL RENDAS
rota.get("/users/getAllRendas", async(req, res) => {
    const getRendas = await controllerRoutes.findAllRendas();
    res.status(200).send(getRendas);
});

//ROTA READ ALL DESPESAS
rota.get("/users/getAllDespesas", async(req, res) => {
    const getDespesas = await controllerRoutes.findAllDespesas();
    res.status(200).send(getDespesas);
});

//ROTA READ ALL SALDOS
rota.get("/users/getAllSaldos", async(req, res) => {
    const getSaldos = await controllerRoutes.findAllSaldos();
    res.status(200).send(getSaldos);
});

//ROTA READ BY NAME
rota.get("/users/getByUser", async(req, res) => {
    try{
        const nome = req.body.nome;
        const email = req.body.email;
        const cpf = req.body.cpf;
        const getUserName = await controllerRoutes.findByUser(nome, email, cpf);
        res.status(200).send(getUserName);
    } catch(error){
        console.log("erro no retorno do usuário por Nome");
    }    
})

//ROTA UPDATE BY NAME
rota.put("/users/updateSaldo", async(req, res) => {
    const id_usuario = req.body.id_usuario;
    const renda = req.body.renda;
    const despesa = req.body.despesa;
    const saldo = req.body.saldo;
    await controllerRoutes.updateSaldo(id_usuario, renda, despesa, saldo);
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