import dataBase from "../database/db.js";

class RouteController{
    //Método para criar usuário
    async createUser(username, password){
        const createUser = `
        INSERT INTO application_users (username, password)
        VALUES ($1, $2)
        `;
        
        const createUserValues = [username, password];
        const {rows} = await dataBase.query(createUser, createUserValues);
        const [newUser] = rows;
    
        return newUser;
    }

    //Método para listar todo os usuários
    async findAllUsers(){
        const findUsers = `
        SELECT uuid, username, password
        FROM application_users
        `;

        const {rows} = await dataBase.query(findUsers);
        
        return rows || [];
    }

    //Método para lstar usuário pelo Nome
    async findByName(username){
        try{
            const findUserName = `SELECT uuid, username
            FROM application_users
            WHERE username = $1
            `;
            const findUserNameValues = [username];
            
            const {rows} = await dataBase.query(findUserName, findUserNameValues);
            const [user] = rows;
            
            return user;
        } catch(error){
            throw new Error("Erro na consulta por Nome");
        }
    }
    
    //Método para atualizar usuário
    async updateUser(username, newUsername) {
        const updateUserName = `
        UPDATE application_users
        SET username = $1
        WHERE username = $2
        `;
        const updateUserNameValues = [newUsername, username];
        
        await dataBase.query(updateUserName, updateUserNameValues);
    }
    
    //Método para deletar usuário
    async deleteUser(username){
        const deleteUser = `
        DELETE
        FROM application_users
        WHERE username = $1
        `;
        const deleteUserValues = [username];

        await dataBase.query(deleteUser, deleteUserValues);
    }
}

export default new RouteController();