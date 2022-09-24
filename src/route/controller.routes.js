import dataBase from "../database/db.js";

class RouteController{
    //Método para criar usuário
    async createUser(nome, email, cpf){
        const createUser = `
        INSERT INTO usuarios (nome, email, cpf)
        VALUES ($1, $2, $3)
        `;
        
        const createUserValues = [nome, email, cpf];
        const {rows} = await dataBase.query(createUser, createUserValues);
        const [newUser] = rows;
    
        return newUser;
    }

    //Método para criar renda
    async createRenda(id_usuario, valor, descricao){
        const createRenda = `
        INSERT INTO rendas (id_usuario, valor, descricao)
        VALUES ($1, $2, $3)
        `;
        
        const createRendaValues = [id_usuario, valor, descricao];
        const {rows} = await dataBase.query(createRenda, createRendaValues);
        const [newRenda] = rows;
    
        return newRenda;
    }

    //Método para criar despesa
    async createDespesa(id_usuario, valor, descricao){
        const createDespesa = `
        INSERT INTO despesas (id_usuario, valor, descricao)
        VALUES ($1, $2, $3)
        `;
        
        const createDespesaValues = [id_usuario, valor, descricao];
        const {rows} = await dataBase.query(createDespesa, createDespesaValues);
        const [newDespesa] = rows;
    
        return newDespesa;
    }

    //Método para criar saldo do usuário
    async createSaldo(id_usuario, renda, despesa, saldo){
        const createSaldo = `
        INSERT INTO saldos (id_usuario, renda, despesa, saldo)
        VALUES ($1, $2, $3, $4)
        `;
        
        const createSaldoValues = [id_usuario, renda, despesa, saldo];
        const {rows} = await dataBase.query(createSaldo, createSaldoValues);
        const [newSaldo] = rows;
    
        return newSaldo;
    }

    //Método para listar todo os usuários
    async findAllUsers(){
        const findUsers = `
        SELECT uuid, nome, email, cpf
        FROM usuarios
        `;

        const {rows} = await dataBase.query(findUsers);
        
        return rows || [];
    }
    
    //Método para listar todo as rendas
    async findAllRendas(){
        const findRendas = `
        SELECT uuid, id_usuario, valor, descricao, datahora
        FROM rendas
        `;

        const {rows} = await dataBase.query(findRendas);
        
        return rows || [];
    }
    
    //Método para listar todo as despesas
    async findAllDespesas(){
        const findDespesas = `
        SELECT uuid, id_usuario, valor, descricao, datahora
        FROM despesas
        `;

        const {rows} = await dataBase.query(findDespesas);
        
        return rows || [];
    }
    
    //Método para listar todo os saldos
    async findAllSaldos(){
        const findSaldos = `
        SELECT uuid, id_usuario, renda, despesa, saldo
        FROM saldos
        `;

        const {rows} = await dataBase.query(findSaldos);
        
        return rows || [];
    }

    //Método para lstar usuário pelo Nome
    async findByUser(nome, email, cpf){
        try{
            const findUserName = `SELECT uuid
            FROM usuarios
            WHERE nome = $1 AND email = $2 AND cpf = $3
            `;
            const findUserNameValues = [nome, email, cpf];
            
            const {rows} = await dataBase.query(findUserName, findUserNameValues);
            const [user] = rows;
            
            return user;
        } catch(error){
            throw new Error("Erro na consulta por Nome");
        }
    }
    
    //Método para atualizar usuário
    async updateSaldo(id_usuario, renda, despesa, saldo) {
        const updateUserName = `
        UPDATE saldos
        SET renda = $2, despesa = $3, saldo = $4
        WHERE id_usuario = $1
        `;
        const updateUserNameValues = [id_usuario, renda, despesa, saldo];
        
        await dataBase.query(updateUserName, updateUserNameValues);
    }
    
    //Método para deletar usuário
    async deleteUser(nome, email, cpf){
        const deleteUser = `
        DELETE
        FROM usuarios
        WHERE nome = $1, email = $2, cpf = $3
        `;
        const deleteUserValues = [nome, email, cpf];

        await dataBase.query(deleteUser, deleteUserValues);
    }
}

export default new RouteController();