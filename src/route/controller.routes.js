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
    async createRenda(idUsuario, valor, descricao){
        const createRenda = `
        INSERT INTO rendas (idUsuario, valor, descricao)
        VALUES ($1, $2, $3)
        `;
        
        const createRendaValues = [idUsuario, valor, descricao];
        const {rows} = await dataBase.query(createRenda, createRendaValues);
        const [newRenda] = rows;
    
        return newRenda;
    }

    //Método para criar despesa
    async createDespesa(idUsuario, valor, descricao){
        const createDespesa = `
        INSERT INTO despesas (idUsuario, valor, descricao)
        VALUES ($1, $2, $3)
        `;
        
        const createDespesaValues = [idUsuario, valor, descricao];
        const {rows} = await dataBase.query(createDespesa, createDespesaValues);
        const [newDespesa] = rows;
    
        return newDespesa;
    }

    //Método para criar saldo do usuário
    async createSaldo(idUsuario, renda, despesa, saldo){
        const createSaldo = `
        INSERT INTO saldos (idUsuario, renda, despesa, saldo)
        VALUES ($1, $2, $3, $4)
        `;
        
        const createSaldoValues = [idUsuario, renda, despesa, saldo];
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

    //Método para lstar usuário pelo Nome
    async findByUser(nome, email, cpf){
        try{
            const findUserName = `SELECT uuid, nome, email, cpf
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
    async updateUser(nome, email, cpf, newNome, newEmail, newCpf) {
        const updateUserName = `
        UPDATE usuarios
        SET nome = $1, email = $2, cpf = $3
        WHERE nome = $4, email = $5, cpf = $6
        `;
        const updateUserNameValues = [newNome, newEmail, newCpf, nome, email, cpf];
        
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