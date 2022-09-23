import Transacao from "./Transacao.js";

export default class Despesa extends Transacao{
    //Construtor e super() da superclasse
    constructor(id, id_usuario, valor, descricao) {
        super(id, id_usuario, valor, descricao);
    };

    //MÉTODOS
    sacar(valorSaque){
        this.valor -= valorSaque;
    }; 
};