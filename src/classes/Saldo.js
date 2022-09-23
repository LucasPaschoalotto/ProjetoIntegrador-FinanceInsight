export default class Saldo{
    #id
    #idUsuario
    #renda
    #despesa
    #saldo
    constructor(id, idUsuario, renda, despesa, saldo){
        this.#id = id;
        this.#idUsuario = idUsuario;
        this.#renda = renda;
        this.#despesa = despesa;
        this.#saldo = saldo;
    };

    //GETTERS
    get id(){
        return this.#id;
    };

    get idUsuario(){
        return this.#idUsuario;
    };

    get renda(){
        return this.#renda;
    };

    get despesa(){
        return this.#despesa;
    };

    get saldo(){
        return this.#saldo;
    };

    //SETTERS
    set id(novoId){
        this.#id = novoId;
    };

    set idUsuario(novoUsuario){
        this.#idUsuario = novoUsuario;
    };

    set renda(novaRenda){
        this.#renda = novaRenda;
    };

    set despesa(novaDespesa){
        this.#despesa = novaDespesa;
    };

    set saldo(novoSaldo){
        this.#saldo = novoSaldo;
    };

    //MÉTODOS
    calcularSaldo(){
        this.#saldo += this.#renda + this.#despesa
    }
}