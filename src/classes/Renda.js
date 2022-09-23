import Transacao from "./Transacao.js";

export default class Renda extends Transacao{
    //Construtor e super() da superclasse
    constructor(id, id_usuario, valor, descricao) {
        super(id, id_usuario, valor, descricao);
    };

    //MÉTODOS
    depositar(valorDeposito){
        this.valor += valorDeposito;
    };
};
