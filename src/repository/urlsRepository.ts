import { knexInstance } from "../config/db/configDb";
import redisClient from "../config/db/redis";
import { IUrl } from "../model/urls";
import { IUrlsReposiotory } from "../model/urlsRepository.interface";

export class UrlsRepository implements IUrlsReposiotory {
  async create(original_url: string, url_short: string): Promise<IUrl> {
    const [url] = await knexInstance<IUrl>("urls")
      .insert({
        original_url: original_url,
        url_short: url_short,
        clicks: 0,
      })
      .returning("*");

    return url;
  }

  async addClick(id: number): Promise<void> {
    await knexInstance<IUrl>("urls").where({ id: id }).increment("clicks", 1);
  }

  async findUrl(url_short: string): Promise<IUrl> {
    const cacheData = await redisClient.get(`url:${url_short}`);
    if (cacheData) {
      await redisClient.incr(`access:${url_short}`);
      return JSON.parse(cacheData) as unknown as IUrl;
    }
    const [url] = await knexInstance<IUrl>("urls")
      .select("*")
      .where({ url_short: url_short });

    if (url) {
      await redisClient.setEx(
        `url:${url_short}`,
        parseInt(process.env.TTL_REDIS || "3600"),
        JSON.stringify(url)
      );

      await redisClient.set(`access:${url_short}`, 1);
    }

    return url;
  }
}
