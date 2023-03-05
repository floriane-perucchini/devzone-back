import { client } from "../services/index.service.js";

const categoryDatamapper = {
  getAll: async function () {
    const sql = `SELECT c.*, json_agg(t) AS tools
                 FROM "Category" c
                        LEFT JOIN "Tool" t ON c.id = t."categoryId"
                 GROUP BY c.id, c.name, c.description, c.order
                 ORDER BY c.order`;

    const results = await client.query(sql);
    return results.rows;
  },
  get: async function (id) {
    const sql = `SELECT c.*, json_agg(t.*) as tools
    FROM "Category" c
    LEFT JOIN "Tool" t ON c.id = t."categoryId"
    WHERE c.id = $1
    GROUP BY c.id, c.name, c.description, c.order, c."createdAt", c."updatedAt"
    ORDER BY c.order, min(t."order");`;

    const result = await client.query(sql, [id]);
    return result.rows[0];
  },
};

export default categoryDatamapper;
