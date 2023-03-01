import "dotenv/config";
import pg from "pg";

const { Client } = pg;

const client = new Client();
await client.connect();

export default client;
