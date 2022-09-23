export default class Transacao {
    #id
    #idUsuario
    #valor
    #descricao
    constructor(id, idUsuario, valor, descricao) {
        this.#id = id;
        this.#idUsuario = idUsuario;
        this.#valor = valor;
        this.#descricao = descricao;
    };

    //GETTERS
    get id(){
        return this.#id;
    };
    
    get idUsuario(){
        return this.#idUsuario;
    };

    get valor(){
        return this.#valor;
    };

    get descricao(){
        return this.#descricao;
    };


    //SETTERS
    set id(novoid){
        this.#id = novoid;
    };
    
    set idUsuario(novoidUsuario){
        this.#idUsuario = novoidUsuario;
    };

    set valor(novovalor){
        this.#valor = novovalor;
    };

    set descricao(novaDescricao){
        this.#descricao = novaDescricao;
    };

}

