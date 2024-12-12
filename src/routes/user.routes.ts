import express, {Request, Response} from "express"

const userRoutes = express.Router();

userRoutes.get("/users", (req: Request, res: Response) => {
    res.send("Tá funcionando os usuários")
});

export { userRoutes }