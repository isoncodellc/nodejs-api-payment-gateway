import { config } from "dotenv";
config({silent: process.env.NODE_ENV != "production"});

export const PORT = process.env.PORT;
export const STRIPE_PRIVATE_KEY = process.env.STRIPE_PRIVATE_KEY;
