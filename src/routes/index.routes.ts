import express from "express";
import { urlRoutes } from "./url.routes";

const routes = (app: any) => {
  app.use(express.json(), urlRoutes);
};

export { routes };
