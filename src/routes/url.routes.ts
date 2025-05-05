import express from "express";
import { UrlController } from "../controller/url.controller";
import { urlsService } from "../service/urls.service";
import { UrlsRepository } from "../repository/urlsRepository";

const urlRoutes = express.Router();
const urlRepository = new UrlsRepository();
const urlService = new urlsService(urlRepository);
const urlController = new UrlController(urlService);

urlRoutes.post("/url", (req, res) => urlController.create(req, res));
urlRoutes.get("/url/:shortUrl", (req, res) => urlController.find(req, res));
export { urlRoutes };
