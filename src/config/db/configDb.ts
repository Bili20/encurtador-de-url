import { Knex, knex } from "knex";
import * as dotenv from "dotenv";
dotenv.config();

const config: Knex.Config = {
  client: "pg",
  connection: process.env.DATABASE_URL,
  pool: {
    min: 2,
    max: 10,
  },
};

export const knexInstance = knex(config);

knexInstance
  .raw("SELECT 1")
  .then(() =>
    console.log("✅ Conexão com o PostgreSQL estabelecida com sucesso")
  )
  .catch((err) => {
    console.error("❌ Falha ao conectar ao PostgreSQL:", err);
    process.exit(1);
  });
