
const buttonGetUsers = document.getElementById("getUsers");
const buttonCreateUser = document.getElementById("createUser")

buttonGetUsers.addEventListener("click", async (info) => {
    info.preventDefault();

    let nome;
    await fetch("/users/getAllUsers",{
        method: "GET"
        })
        .then(response => response.json())          
        .then(json => {
            nome = json;
            console.log(nome);
    });
       
    const listaDeUsuarios = document.querySelector(".listaDeUsuarios");
    for(var i = 0; i < nome.length; i++){
        console.log(nome[i])
        console.log(nome[i].username);
        listaDeUsuarios.insertAdjacentHTML("afterbegin", `<li>${nome[i].username}</li>`);
    };
});

buttonCreateUser.addEventListener("click", async(info) => {
    info.preventDefault();


    const a = "testeFrontVar";
    const b = "testeFrontPass"

    console.log("ok");
    const rawResponse = await fetch('/users', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: a, password: b})
    });
    const content = await rawResponse.json();
    
    console.log(content);
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
