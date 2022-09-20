console.log('oi');

const criarUsuario = document.querySelector('form');
console.log(criarUsuario);

criarUsuario.addEventListener("submit", function criarUsuarioController(infosDoEvento) {
    infosDoEvento.preventDefault();
    console.log("Criando o usuário");
});

/*

function getDetails(url) {
    return fetch(url).then(response => response.json());
}

var u = "http://localhost:5000/users/getAllUsers";
getDetails(u).then(function(data) {
    console.log(data);
})*/
