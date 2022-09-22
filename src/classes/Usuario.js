export default class Usuario{
    #nome
    #email
    #cpf
    #id
    constructor(nome, email, cpf, id) {
        this.#nome = nome;
        this.#email = email;
        this.#cpf = cpf
        this.#id = id;
    }

    //GETTERS
    get nome(){
        return this.#nome;
    }

    get email(){
        return this.#email;
    }

    get cpf(){
        return this.#cpf;
    }
    
    get id(){
        return this.#id;
    }

    //SETTERS
    set nome(novoNome){
        this.#nome = novoNome;
    }

    set email(novoEmail){
        this.#email = novoEmail;
    }

    set cpf(novoCpf){
        this.#cpf = novoCpf;
    }

    set id(novoId){
        this.#id = novoId;
    }

}

