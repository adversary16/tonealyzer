import { RequestHandler, Router } from "express";
import { statusService } from "../services/status";

const handleStatus: RequestHandler = (req, res) => {};

export const baseRouter = Router();
baseRouter.get("/", (req, res) => {
  res.json(statusService.status);
});
