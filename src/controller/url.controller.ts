import { urlsService } from "../service/urls.service";
import { Request, Response } from "express";
export class UrlController {
  constructor(private readonly urlsService: urlsService) {}

  async create(req: Request, res: Response) {
    try {
      const param = req.body;

      const url_short = await this.urlsService.create(param.original_url);
      res.status(201).json(url_short);
    } catch (e) {
      console.error(e);
      res.status(400).json({ message: "Erro ao criar URL encurtada" });
    }
  }

  async find(req: Request, res: Response) {
    try {
      const original_url = await this.urlsService.findByShortUrl(
        req.params.shortUrl
      );
      res.status(301).redirect(original_url);
    } catch (e) {
      res.status(404).json({ message: "URL não encontrada" });
    }
  }
}
