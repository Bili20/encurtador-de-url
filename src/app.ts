import express, { Request, Response } from "express";
import { knexInstance } from "./config/db/configDb";
import { IUrl } from "./model/urls";

const app = express();
app.use(express.json());
knexInstance;

app.listen(3000, () => console.log("API rodando na porta 3000"));
