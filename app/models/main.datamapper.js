import { client } from "../services/index.service.js";

const mainDatamapper = {
  getUser: async function ({ username = null, email = null }) {
    const sql = `SELECT * FROM "User" WHERE username = $1 OR email = $2`;
    const values = [username, email];

    const result = await client.query(sql, values);
    return result.rows[0];
  },

  checkUser: async function ({
    username = null,
    email = null,
    password = null,
  }) {
    const sql = `SELECT * FROM "User" WHERE username = $1 OR email = $2 AND password = $3`;
    const values = [username, email, password];

    const result = await client.query(sql, values);
    return result.rows[0];
  },

  createEmailToken: async function ({ userId, emailToken }) {
    const sql = `INSERT INTO "Token" ("userId", "emailToken") VALUES ($1, $2)`;
    const values = [userId, emailToken];

    return await client.query(sql, values);
  },

  getVerifiedUser: async function (emailToken) {
    const sql = `SELECT * FROM "Token" JOIN "User" ON "User".id = "Token"."userId" WHERE "Token"."emailToken" = $1`;
    const values = [emailToken];

    const result = await client.query(sql, values);
    return result.rows[0];
  },

  createRefreshToken: async function ({ userId, jwtRefreshToken, expiration }) {
    const sql = `UPDATE "Token" SET "jwtRefreshToken" = $1, expiration = $2 WHERE "userId" = $3`;
    const values = [jwtRefreshToken, expiration, userId];

    return await client.query(sql, values);
  },
};

export default mainDatamapper;
