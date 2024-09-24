import { NextFunction, Request, RequestHandler, Response } from "express";
import { Util } from "../utils";

interface ApiResponseOptions {
    loggable?: boolean
}

const DEFAULT_API_OPTIONS: ApiResponseOptions = { loggable: false };

export const apiResponse = (cb: Function, options: ApiResponseOptions = DEFAULT_API_OPTIONS): RequestHandler  => async (req, res, next) => {
    let hasError = false;
    let result: any = undefined;
    try {
        result = await cb(req);
        res.json(result);
        next();
    } catch(e) {
        hasError = true;
        next(e)
    } finally {
        if (options.loggable) {
            Util.log(req.path, hasError ? 'error' : 'success', req.body, typeof result === 'object' ? JSON.stringify(result) : result )
        } 
    }
}

export const apiError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500);
    res.json(err?.message)
}