import { client } from "../services/index.service.js";

const categoryDatamapper = {
  getAll: async function () {
    const sql = `SELECT c.*, ARRAY_AGG(t.* ORDER BY t.order) as tools
    FROM "Category" c
    LEFT JOIN "Tool" t ON c.id = t.category_id
    GROUP BY c.id, c.name, c.description, c.order
    ORDER BY c.order`;

    const results = await client.query(sql);
    return results.rows;
  },
  get: async function (id) {
    const sql = `SELECT c.*, array_agg(t.*) as tools
    FROM "Category" c
    LEFT JOIN "Tool" t ON c.id = t.category_id
    WHERE c.id = $1
    GROUP BY c.id, c.name, c.description, c.order, c.created_at, c.updated_at
    ORDER BY c.order, min(t."order");`;

    const result = await client.query(sql, [id]);
    return result.rows[0];
  },
  
  

};

export default categoryDatamapper;
