// import express, { Request, Response} from 'express';
// import cors from 'cors';

// const app = express();

// app.use(express.json());
// app.use(cors());

// app.listen(3003, () => {
//     console.log("Servidor rodando na porta 3003");
// });

// app.get("/ping", (req: Request, res: Response) => {
//   res.send("Pong!");
// });

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

export const app = express()

app.use(cors())
app.use(express.json())

app.listen(Number(process.env.PORT), () => {
    console.log(`Servidor rodando na porta ${Number(process.env.PORT)}`)
})