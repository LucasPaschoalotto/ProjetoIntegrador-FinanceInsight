import dataBase from "../database/db.js";

class RouteController{
    //Método para criar usuário
    async createUser(username, password){
        const createUserScript = `
        INSERT INTO application_users (username, password)
        VALUES ($1, $2)
        `;
        
        const createUserValues = [username, password];
        const {rows} = await dataBase.query(createUserScript, createUserValues);
        const [newUser] = rows;
    
        return newUser;
    }

    //Método para listar todo os usuários
    async findAllUsers(){
        const findUsers = `
        SELECT uuid, username
        FROM application_users
        `;

        const {rows} = await dataBase.query(findUsers);
        
        return rows || [];
    }
    /*
    //Método para lstar usuário pelo ID
    async findById(uuid: string): Promise<User> {
        try{
            const queryId = `SELECT uuid, username
            FROM application_users
            WHERE uuid = $1
            `;
            const valueId = [uuid];
    
            const {rows} = await db.query<User>(queryId, valueId);
            const [user] = rows;
    
            return user;
        } catch(error){
            throw new DatabaseError("Erro na consulta por ID", error);

        }
    }

    //Método para atualizar usuário
    async updateUser(user: User): Promise<void> {
        const updateScript = `
        UPDATE application_users
        SET username = $1, password = crypt($2, '${authenticationCryptKey}')
        WHERE uuid = $3
        RETURNING 
        `;
        const updateValues = [user.username, user.password, user.uuid];
        
        await db.query(updateScript, updateValues);
    }

    //Método para deletar usuário
    async removeUser(uuid: string): Promise<void>{
        const removeScript = `
        DELETE
        FROM application_users
        WHERE uuid = $1
        `;
        const removeValues = [uuid];

        await db.query(removeScript, removeValues);
    }
*/
}

export default new RouteController();