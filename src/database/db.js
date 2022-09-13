import { Pool } from "pg";

const linkDataBase = "postgres://xjgrpcjp:SRjR7vtLBDxIgiraRTORf52vgAqliJYa@kesavan.db.elephantsql.com/xjgrpcjp";
const dataBase = new Pool({linkDataBase});

export default dataBase;