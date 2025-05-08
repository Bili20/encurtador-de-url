import cron from "node-cron";
import redisClient from "../config/db/redis";

// a cada 10 minutos
cron.schedule("*/10 * * * *", async () => {
  const accessKeys = [];
  let cursor = "0";
  try {
    do {
      const reply = await redisClient.scan(cursor, {
        MATCH: "access:*",
        COUNT: 100,
      });
      cursor = reply.cursor;
      accessKeys.push(...reply.keys);
    } while (cursor !== "0");

    const popularUrls = [];
    for (const key of accessKeys) {
      const accessCount = (await redisClient.get(key)) || "";

      if (parseInt(accessCount) >= 3) {
        const shortUrl = key.replace("access:", "");
        const urlData = await redisClient.get(`url:${shortUrl}`);

        if (urlData) {
          popularUrls.push(JSON.parse(urlData));
        }
      }
    }

    for (const url of popularUrls) {
      await redisClient.expire(`url:${url.url_short}`, 7200);
      await redisClient.expire(`access:${url.url_short}`, 3600);
    }
    console.log(`URLs populares atualizadas: ${popularUrls.length}`);
  } catch (e) {
    console.error("Erro no cache job: ", e);
  }
});
