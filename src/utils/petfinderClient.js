import { Client } from "@petfinder/petfinder-js";
const API_KEY = import.meta.env.VITE_API_KEY;
const API_SECRET = import.meta.env.VITE_API_SECRET;

const client = new Client({ apiKey: API_KEY, secret: API_SECRET });

export default client;
