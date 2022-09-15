import dataBase from "../database/db.js";

class RouteController{
    //Método para criar novo usuário
    criarUsuario = async (req, res) => {
        const {uid, nome, email, cpf} = req.body;
        const {rows} = await dataBase.query(
            "INSERT INTO application_usuarios (uid, nome, email, cpf) VALUES ($1, $2, $3, $4)",
            [uid, nome, email, cpf]
        );
        
        res.status(201).send({
            message: "Usuario criado com sucesso",
            body: {
                usuario: {uid, nome, email, cpf}
            },
        });
    };

    //Método para listar todo os usuários
    async findAllUsers(){
        const queryUsers = `
        SELECT uuid, username
        FROM application_users
        `;
        const {rows} = await dataBase.query(queryUsers);
        
        return rows || [];
    }

    listarUsuarios = async(req, res) => {
        res.sendStatus(200);
        /*const response = await dataBase.query(
            "SELECT * FROM application_usuarios"
        );
        res.status(200).send(response.rows);*/
    };
}

export default new RouteController();