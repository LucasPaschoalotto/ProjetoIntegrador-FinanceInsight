import server from "./app.js";

const porta = 5000;

//Inicializando o servidor na rota 5000
server.listen(porta, () => {
    console.log("Executando aplicação na porta 5000\nhttp://localhost:5000");
});
