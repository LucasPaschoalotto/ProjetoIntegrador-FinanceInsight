import pg from "pg";
const { Pool } = pg;

//Endereço do DB
const linkDataBase = { connectionString: "postgres://xjgrpcjp:SRjR7vtLBDxIgiraRTORf52vgAqliJYa@kesavan.db.elephantsql.com/xjgrpcjp"};

//Conexão com o DB
const dataBase = new Pool(linkDataBase);

export default dataBase;