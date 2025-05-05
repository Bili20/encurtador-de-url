import express from "express";
import { knexInstance } from "./config/db/configDb";
import { routes } from "./routes/index.routes";
import path from "path";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "../views")));
routes(app);
knexInstance;

app.listen(3000, () => console.log("API rodando na porta 3000"));
