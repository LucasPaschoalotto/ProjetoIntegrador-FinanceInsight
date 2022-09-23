import Transacao from "./Transacao.js";

export default class Despesa extends Transacao{
    //Construtor e super() da superclasse
    constructor(id, idUsuario, valor, descricao) {
        super(id, idUsuario, valor, descricao);
    };

    //MÉTODOS
    sacar(valorSaque){
        this.valor -= valorSaque;
    }; 
};