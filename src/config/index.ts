import dotenv from 'dotenv';
import { resolve } from 'path';
const DEFAULT_PORT = 3000;
export const LOG_DIR = process.env.APP_LOG_DIR ?? resolve('./log');
export const ML_MODEL = process.env.APP_ML_MODEL ?? 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';
export const ML_CACHE_DIR = process.env.APP_MODEL_CACHE_DIR ? resolve(process.env.APP_MODEL_CACHE_DIR) : resolve('./model_cache');
export const IS_VERBOSE = process.env.NODE_ENV === 'dev' 
export const LISTEN_PORT = (process.env.APP_LISTEN_PORT && !Number.isNaN(Number(process.env.APP_LISTEN_PORT))) 
    ? Number(process.env.APP_LISTEN_PORT) 
    : (() => {
        const errorMessage = process.env.APP_LISTEN_PORT 
            ? `Using default port ${DEFAULT_PORT} instead of wrong value ${process.env.APP_LISTEN_PORT}`
            : 'Using default port ' + DEFAULT_PORT;
        console.warn(errorMessage);
        return DEFAULT_PORT
    })();