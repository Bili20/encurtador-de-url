import { IUrlsReposiotory } from "../model/urlsRepository.interface";

export class urlsService {
  constructor(private readonly urlRepository: IUrlsReposiotory) {}

  async create(url: string) {
    let shortUrl = "";
    let isUnique = false;
    while (!isUnique) {
      shortUrl = this.generateShortCode(6);
      const existingUrl = await this.urlRepository.findUrl(shortUrl);
      if (!existingUrl) {
        isUnique = true;
      }
    }
    if (shortUrl.length) {
      const newUrl = await this.urlRepository.create(url, shortUrl);
      return process.env.BASE_URL + "url/" + newUrl.url_short;
    }
  }

  async findByShortUrl(shortUrl: string) {
    const url = await this.urlRepository.findUrl(shortUrl);
    return url.original_url;
  }

  private generateShortCode(length: number) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}
