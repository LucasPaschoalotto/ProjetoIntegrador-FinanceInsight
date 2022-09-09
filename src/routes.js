import { Router } from "express";

const route = Router();

//Rota inicial do projeto ao subir o servidor
route.get("/", (req, res) => {
    res.send("Financial Insight");
});

export default route;