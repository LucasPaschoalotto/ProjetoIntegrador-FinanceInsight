import Usuario from "./Usuario.js";

export default class Conta {
    #numero
    #saldo
    #usuario
    constructor(numero, saldo, nome, email, cpf) {
        this.#numero = numero;
        this.#saldo = saldo;
        this.#usuario = new Usuario(nome, email, cpf);
    }

    //GETTERS
    get numero(){
        return this.#numero;
    }

    get saldo(){
        return this.#saldo;
    }

    get usuario(){
        return this.#usuario;
    }

    //SETTERS
    set numero(novoNumero){
        this.#numero = novoNumero;
    }

    set saldo(novoSaldo){
        this.#saldo = novoSaldo;
    }

    set usuario(novoUsuario){
        this.#usuario = novoUsuario;
    }

    //MÉTODOS
    sacar(valor){
        if(valor > this.#saldo){
            throw new Error("Saldo insuficiente");
        }
        this.#saldo -= valor;
    }

    depositar(valor){
        this.#saldo += valor;
    }

}

