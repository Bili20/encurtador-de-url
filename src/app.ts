import express from "express";
import { knexInstance } from "./config/db/configDb";
import { routes } from "./routes/index.routes";
import path from "path";
import cors from "cors";
import redisClient from "./config/db/redis";
import { RateLimiter } from "./middlewares/rateLimit";
const app = express();
app.use(cors());
app.use(RateLimiter.limiter());
app.use(express.static(path.join(__dirname, "../views")));
routes(app);
knexInstance;
redisClient;

app.listen(3000, () => console.log("API rodando na porta 3000"));
