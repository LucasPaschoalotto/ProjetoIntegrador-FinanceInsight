export default class Saldo{
    #id
    #id_usuario
    #renda
    #despesa
    #saldo
    constructor(id, id_usuario, renda, despesa, saldo){
        this.#id = id;
        this.#id_usuario = id_usuario;
        this.#renda = renda;
        this.#despesa = despesa;
        this.#saldo = saldo;
    };

    //GETTERS
    get id(){
        return this.#id;
    };

    get id_usuario(){
        return this.#id_usuario;
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

    set id_usuario(novoUsuario){
        this.#id_usuario = novoUsuario;
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