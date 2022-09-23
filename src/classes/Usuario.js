export default class Usuario{
    #nome
    #email
    #cpf
    #id
    constructor(id, nome, email, cpf) {
        this.#id = id;
        this.#nome = nome;
        this.#email = email;
        this.#cpf = cpf
    };

    //GETTERS
    get id(){
        return this.#id;
    };

    get nome(){
        return this.#nome;
    };

    get email(){
        return this.#email;
    };

    get cpf(){
        return this.#cpf;
    };
    
    //SETTERS
    set id(novoId){
        this.#id = novoId;
    };

    set nome(novoNome){
        this.#nome = novoNome;
    };

    set email(novoEmail){
        this.#email = novoEmail;
    };

    set cpf(novoCpf){
        this.#cpf = novoCpf;
    };
}

