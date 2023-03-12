import { client } from "../services/index.service.js";

const tokenDatamapper = {
  getUser: async function (emailToken) {
    const sql = `SELECT * FROM "Token" JOIN "User" ON "User".id = "Token"."userId" WHERE "Token"."emailToken" = $1`;

    const result = await client.query(sql, [emailToken]);
    return result.rows[0];
  },

  getToken: async function (userId) {
    const sql = `SELECT "emailToken", "jwtRefreshToken" FROM "Token" WHERE "Token"."userId" = $1`;

    const result = await client.query(sql, [userId]);
    return result.rows[0];
  },

  createEmail: async function ({ userId, emailToken }) {
    const sql = `INSERT INTO "Token" ("userId", "emailToken") VALUES ($1, $2)`;
    const values = [userId, emailToken];

    return await client.query(sql, values);
  },

  createRefresh: async function ({ userId, jwtRefreshToken, expiration }) {
    const sql = `UPDATE "Token" SET "jwtRefreshToken" = $1, expiration = $2 WHERE "userId" = $3`;
    const values = [jwtRefreshToken, expiration, userId];

    return await client.query(sql, values);
  },

  createRefreshExternal: async function ({
    userId,
    jwtRefreshToken,
    expiration,
  }) {
    const sql = `INSERT INTO "Token" ("jwtRefreshToken", expiration, "userId") VALUES ($1, $2, $3)`;
    const values = [jwtRefreshToken, expiration, userId];

    return await client.query(sql, values);
  },
};

export default tokenDatamapper;
