import Transacao from "./Transacao.js";

export default class Renda extends Transacao{
    //Construtor e super() da superclasse
    constructor(id, idUsuario, valor, descricao) {
        super(id, idUsuario, valor, descricao);
    };

    //MÉTODOS
    depositar(valorDeposito){
        this.valor += valorDeposito;
    };
};
