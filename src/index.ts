import express, { Request, Response } from "express"

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
    res.send("Tá funcioando automático vom devb");
});

app.get("/users", (req: Request, res: Response) => {
    res.send("Tá funcionando os usuários")
});

app.listen(port, () => {
    console.log(`Servidor funcioando na porta ${port}`);
});