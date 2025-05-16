import { createClient } from "redis";

const redisClient = createClient({
  url: "redis://localhost:6379",
});
redisClient.on("error", (err) => console.error("Redis Client Error", err));

redisClient
  .connect()
  .then(() => console.log("✅ Redis conectado com sucesso"))
  .catch((e) => console.error("❌ Redis não conectado:", e));

export default redisClient;
