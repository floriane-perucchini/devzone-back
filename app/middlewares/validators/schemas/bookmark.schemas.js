import { z } from "zod";

const bookmarkSchemas = {
  createSchema: z.object({
    name: z.string(),
    description: z.string(),
    link: z.string(),
    link_img: z.string(),
    user_id: z.number(),
    tool_id: z.number(),
  }),

  updateSchema: z.object({
    name: z.string(),
    description: z.string(),
    link: z.string(),
    link_img: z.string(),
    user_id: z.number(),
    tool_id: z.number(),
  }),
};

export default bookmarkSchemas;
