import pg from "pg";
const { Pool } = pg;

//Endereço do DB
const linkDataBase = { connectionString: "postgres://mckiferl:wEb8E-Y4wgjqqvrXo5ShSakC5LHRSond@kesavan.db.elephantsql.com/mckiferl"};

//Conexão com o DB
const dataBase = new Pool(linkDataBase);

export default dataBase;