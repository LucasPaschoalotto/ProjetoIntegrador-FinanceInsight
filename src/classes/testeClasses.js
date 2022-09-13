import Conta from "./Conta.js";
import Usuario from "./Usuario.js";

const novoUsuario = new Usuario("Lucas", "lucas@email.com", 12345);
console.log("USUARIO");
//teste Getter
console.log("nome " + novoUsuario.nome);
console.log("email " + novoUsuario.email);
console.log("cpf " + novoUsuario.cpf);
//teste Setter
novoUsuario.nome = "leandro";
novoUsuario.email = "leandro@email";
novoUsuario.cpf = 789456;
console.log("nome " + novoUsuario.nome);
console.log("email " + novoUsuario.email);
console.log("cpf " + novoUsuario.cpf);

const novaConta = new Conta(15, 1, "Lucas");
console.log("\n\nCONTA");
//teste Getter
console.log("numero " + novaConta.numero);
console.log("saldo " + novaConta.saldo);
console.log("usuario " + novaConta.usuario);
//teste Setter
novaConta.numero = 11;
novaConta.saldo = 0;
novaConta.usuario = "leandro";
console.log("numero " + novaConta.numero);
console.log("saldo " + novaConta.saldo);
console.log("usuario " + novaConta.usuario);




novaConta.depositar(15);
console.log("saldo" + novaConta.saldo);
novaConta.sacar(11);
console.log("saldo" + novaConta.saldo);
//novaConta.sacar(20); Error
