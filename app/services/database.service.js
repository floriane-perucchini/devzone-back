import { Client } from "pg";
const db = new Client();
await db.connect();

export default db;
