import Usuario from "../classes/Usuario.js"

var logado = 0;

//Seleciona os botões do HTML
const buttonGetUsuarios = document.getElementById("getUsuario");
const buttonCreateUsuario = document.getElementById("createUsuario")
const buttonLogarUsuario = document.getElementById("logarUsuario");


//Método para retornar usuários
buttonGetUsuarios.addEventListener("click", async (form) => {
    //Previne comportamento da tag FORM
    form.preventDefault();

    //Seleciona elementos do HTML
    const campoCreate = document.querySelectorAll(".msgCreate");
    const campoRetorno = document.querySelectorAll(".msgRetorno");
    const campoLogar = document.querySelectorAll(".msgLogar");
    const listaUsuarios = document.querySelector(".listaUsuarios");

    //Remove listas printadas anteriormente e mensagem de erro
    campoCreate.forEach(msg => msg.remove());
    campoRetorno.forEach(msg => msg.remove());
    campoLogar.forEach(msg => msg.remove());

    //Fetch GET do DB
    let usuario;
    await fetch("/users/getAllUsers",{
        method: "GET"
        })
        .then(response => response.json())          
        .then(json => usuario = json);
       
    //Printa todos os valores retornados do DB
    for(var i = 0; i < usuario.length; i++){
        listaUsuarios.insertAdjacentHTML("afterbegin", `<li class="msgRetorno">Nome: ${usuario[i].nome} | Email: ${usuario[i].email} | CPF: ${usuario[i].cpf}</li>`);
    };
});


//Método para criar usuários
buttonCreateUsuario.addEventListener("click", async(form) => {
    //Previne comportamento da tag FORM
    form.preventDefault();

    //Seleciona elementos HTML
    const campoCreate = document.querySelectorAll(".msgCreate");
    const campoRetorno = document.querySelectorAll(".msgRetorno");
    const campoLogar = document.querySelectorAll(".msgLogar");
    const retornoUsuario = document.getElementById("retorno");

    //Remove listas printadas anteriormente e mensagem de erro
    campoCreate.forEach(msg => msg.remove());
    campoRetorno.forEach(msg => msg.remove());
    campoLogar.forEach(msg => msg.remove());
    
    //Armazena valores do usuário
    const nome = document.getElementById("setNome").value;
    const email = document.getElementById("setEmail").value;
    const cpf = document.getElementById("setCpf").value;
    
    //Verifica se nome e email estão vazios
    if(!nome || !email || !cpf) return retornoUsuario.insertAdjacentHTML("afterbegin", "<p class='msgCreate'>Nome, email e cpf precisam ser preenchidos</p>");
    const newUsuario = new Usuario(0, nome, email, cpf);
    
    //Verifica se usuário existe
    let verificaUsuario;
    await fetch("/users/getAllUsers",{
        method: "GET"
        })
        .then(response => response.json())          
        .then(json => verificaUsuario = json);
        
        //Printa todos os valores retornados do DB
        for(var i = 0; i < verificaUsuario.length; i++){
            if(verificaUsuario[i].cpf === newUsuario.cpf){
                verificaUsuario = 1;
        }
    };
    
    //Return caso usuário exista no DB
    if(verificaUsuario === 1) return retornoUsuario.insertAdjacentHTML("afterbegin", "<p class='msgCreate'>Usuário já existente</p>");
    
    //Cria usuário caso não exista
    await fetch('/users', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({nome: newUsuario.nome, email: newUsuario.email, cpf: newUsuario.cpf})
    });
    retornoUsuario.insertAdjacentHTML("afterbegin", "<p class='msgCreate'>Usuário criado!</p>")
    
});

//Método para logar usuário
buttonLogarUsuario.addEventListener("click", async(form) => {
    //Previne comportamento da tag FORM
    form.preventDefault();

    //Seleciona elementos HTML
    const campoCreate = document.querySelectorAll(".msgCreate");
    const campoRetorno = document.querySelectorAll(".msgRetorno");
    const campoLogar = document.querySelectorAll(".msgLogar");
    const retornoUsuario = document.getElementById("retorno");
    const campoForm = document.getElementById("login");

    //Remove listas printadas anteriormente e mensagem de erro
    campoCreate.forEach(msg => msg.remove());
    campoRetorno.forEach(msg => msg.remove());
    campoLogar.forEach(msg => msg.remove());

    //Armazena valores do usuário
    const nome = document.getElementById("setNome").value;
    const email = document.getElementById("setEmail").value;
    const cpf = document.getElementById("setCpf").value;
    
    //Verifica se nome e email estão vazios
    if(!nome || !email || !cpf) return retornoUsuario.insertAdjacentHTML("afterbegin", "<p class='msgLogar'>Nome, email e cpf precisam ser preenchidos</p>");
    const logarUsuario = new Usuario(0, nome, email, cpf);

    //Verifica se usuário existe
    let verificaUsuario;
    await fetch("/users/getAllUsers",{
        method: "GET"
        })
        .then(response => response.json())          
        .then(json => verificaUsuario = json);
        
    //Printa todos os valores retornados do DB
    for(var i = 0; i < verificaUsuario.length; i++){
        if(verificaUsuario[i].nome === logarUsuario.nome && verificaUsuario[i].cpf === logarUsuario.cpf){
            var usuarioLogado = new Usuario(verificaUsuario[i].uuid, verificaUsuario[i].nome, verificaUsuario[i].email, verificaUsuario[i].cpf)
            logado = 1;
        };
    };

    //Return caso usuário exista no DB
    if(logado == 0){
        return retornoUsuario.insertAdjacentHTML("afterbegin", "<p class='msgLogar'>Usuário não cadastrado</p>")
    } else{      
        campoForm.remove();
        
        const formStart = document.getElementById("start");
        formStart.insertAdjacentHTML("afterbegin", `
        <p> Usuário "${usuarioLogado.nome}" logado com sucesso! </p>
        <form>
            <p>Rendas:</p>
            <input name="" id="" placeholder="Valor da Renda"/>
            <input name="" id="" placeholder="Descrição"/>
            <button id="inserirRenda">Inserir Renda</button>
        </form>
        <form>
            <p>Despesas:</p>
            <input name="" id="" placeholder="Valor da Despesa"/>
            <input name="" id="" placeholder="Descrição"/>
            <button id="inserirDespesa">Inserir Despesa</button>
        </form>`);

        const setConta = document.getElementById("inserirRenda");
        setConta.addEventListener("click", (form) => {
            form.preventDefault();
            console.log("click");
        });

        const setDespesa = document.getElementById("inserirDespesa");
        setDespesa.addEventListener("click", (form) => {
            form.preventDefault();
            console.log("click");
        });
    };
});
















































    /*const getRoute = '/users/getAllUsers';

    console.log("click");

    fetch(getRoute).then(response => console.log(response));

    fetch("/users/getAllUsers", {
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })*/







/*const getUsuarios = document.querySelector('form');

criarUsuario.addEventListener("submit", function criarUsuarioController(infosDoEvento) {
    infosDoEvento.preventDefault();
    console.log("Criando o usuário");

    const campoCriarUsuario = document.querySelector("input[name='enviarNome']");
    console.log(campoCriarUsuario.value);

    const listaDeUsuarios = document.querySelector(".listaDeUsuarios");
    listaDeUsuarios.insertAdjacentHTML("afterbegin", `<li>${campoCriarUsuario.value}</li>`);

    campoCriarUsuario.value = "";

    console.log(rota.get);
});*/

/*getUsuarios.addEventListener("submit", function getUsersController() {
        fetch(`http://localhost:5000/users/getAllUsers`, {
            method: "GET"
        })
        .then(response => {
            if (!response){
                throw new Error("Erro de Requisição");
            } else {
                console.log(response);
            return response.json();
            }
        })
        .then(json => console.log(json))
        .catch(error => console.log(error));
    })*/

    
   /* const listaUsers = document.querySelector(".listaDeUsuarios");
    listaUsers.insertAdjacentHTML("afterbegin", `<li>${u}</li>`)*/



/*
function getDetails(url) {
    return fetch(url).then(response => response.json());
};

var u = "http://localhost:5000/users/getAllUsers";
getDetails(u).then(function(data) {
    console.log(data);
});*/
