import dotenv from "dotenv";

dotenv.config();

export const BASE_URL = process.env.BASE_URL as string;
export const WINDOW_SIZE = parseInt(process.env.WINDOW_SIZE || "10", 10);
export const REQUEST_TIMEOUT = parseInt(process.env.REQUEST_TIMEOUT || "500", 10);
export const API_TOKEN = process.env.API_TOKEN as string;
//all values imported from .env