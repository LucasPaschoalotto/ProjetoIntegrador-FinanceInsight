import Conta from "./Transacao.js";
import ContaCorrente from "./Renda.js";
import Usuario from "./Usuario.js";
import Renda from "./Renda.js";
import Despesa from "./Despesa.js";
import Saldo from "./Saldo.js";

/*const novoUsuario = new Usuario("Lucas", "lucas@email.com", 12345);
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

const novaConta = new Conta(15, 1, "Lucas", "lucas@email.com", 11122233345);
console.log("\n\nCONTA");
//teste Getter
console.log("numero " + novaConta.numero);
console.log("saldo " + novaConta.saldo);
console.log("usuario nome, email e cpf " + novaConta.usuario.nome + " " + novaConta.usuario.email + " " + novaConta.usuario.cpf);
//teste Setter
novaConta.numero = 11;
novaConta.saldo = 0;
novaConta.usuario = "leandro";
console.log("numero " + novaConta.numero);
console.log("saldo " + novaConta.saldo);
console.log("usuario " + novaConta.usuario);


//novaConta.sacar(20); Error
novaConta.depositar(15);
console.log("saldo" + novaConta.saldo);
novaConta.sacar(11);
console.log("saldo" + novaConta.saldo);

const novaCorrente = new ContaCorrente(12, 1, "Lucas");
console.log(novaCorrente);
console.log(novaCorrente.numero);
console.log(novaCorrente.saldo)
console.log(novaCorrente.depositar(50));
console.log(novaCorrente.saldo)
*/
const novoUsuario = new Usuario(4, "lucas", "lucas@lucas", 111222);

const novaRenda = new Renda(1, novoUsuario.id, 15, "restaurante")
console.log("Renda: " + novaRenda.id)
console.log(novaRenda.id_usuario);
console.log(novaRenda.valor)
console.log(novaRenda.descricao);
novaRenda.depositar(50)
console.log(novaRenda.valor);

const novaDespesa = new Despesa(4, novoUsuario.id, 0, "luz");
console.log("Despesa: " + novaDespesa.id)
console.log(novaDespesa.id_usuario);
console.log(novaDespesa.valor)
console.log(novaDespesa.descricao);
novaDespesa.sacar(100)
console.log(novaDespesa.valor);

const novoSaldo = new Saldo(1, novoUsuario.id, novaRenda.valor, novaDespesa.valor, 0)
novoSaldo.calcularSaldo();
console.log("Saldo: "+ novoSaldo.saldo);
