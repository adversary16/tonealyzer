import { Request, RequestHandler, Router } from "express";
import { statusService } from "../services/status";
import { aiService } from "../services/ai";
import { apiError, apiResponse } from "../middlewares/apiResponse";
import { text } from 'body-parser'

export const baseRouter = Router();
baseRouter.get("/status", apiResponse(() => statusService.status));
baseRouter.post('/analyze', text(), apiResponse((req: Request) => aiService.analyze(req.body), { loggable: true}))
baseRouter.use(apiError)