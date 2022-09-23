export default class Transacao {
    #id
    #id_usuario
    #valor
    #descricao
    constructor(id, id_usuario, valor, descricao) {
        this.#id = id;
        this.#id_usuario = id_usuario;
        this.#valor = valor;
        this.#descricao = descricao;
    };

    //GETTERS
    get id(){
        return this.#id;
    };
    
    get id_usuario(){
        return this.#id_usuario;
    };

    get valor(){
        return this.#valor;
    };

    get descricao(){
        return this.#descricao;
    };


    //SETTERS
    set id(novoId){
        this.#id = novoId;
    };
    
    set id_usuario(novoId_usuario){
        this.#id_usuario = novoId_usuario;
    };

    set valor(novoValor){
        this.#valor = novoValor;
    };

    set descricao(novaDescricao){
        this.#descricao = novaDescricao;
    };

}

