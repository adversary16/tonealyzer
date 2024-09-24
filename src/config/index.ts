import dotenv from 'dotenv';
import { resolve } from 'path';
export const LOG_DIR = process.env.APP_LOG_DIR ?? resolve('./log');
export const ML_MODEL = process.env.APP_ML_MODEL ?? 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';
export const IS_VERBOSE = process.env.NODE_ENV === 'dev' 