import { knexInstance } from "../config/db/configDb";
import { IUrl } from "../model/urls";
import { IUrlsReposiotory } from "../model/urlsRepository.interface";

export class UrlsRepository implements IUrlsReposiotory {
  async create(original_url: string, url_short: string): Promise<IUrl> {
    const [url] = await knexInstance<IUrl>("urls")
      .insert({
        original_url: original_url,
        url_short: url_short,
      })
      .returning("*");

    return url;
  }

  async findUrl(url_short: string): Promise<IUrl> {
    const [url] = await knexInstance<IUrl>("urls")
      .select("*")
      .where({ url_short: url_short });
    return url;
  }
}
