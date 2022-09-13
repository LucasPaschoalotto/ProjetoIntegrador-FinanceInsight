export default class Usuario{
    #nome
    #email
    #cpf
    constructor(nome, email, cpf) {
        this.#nome = nome;
        this.#email = email;
        this.#cpf = cpf
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

}

