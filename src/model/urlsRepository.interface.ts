import { IUrl } from "./urls";

export interface IUrlsReposiotory {
  create(original_url: string, url_short: string): Promise<IUrl>;
  addClick(id: number): Promise<void>;
  findUrl(url_short: string): Promise<IUrl>;
}
