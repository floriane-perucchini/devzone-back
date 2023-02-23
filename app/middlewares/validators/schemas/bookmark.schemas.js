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
    name: z.string().optional(),
    description: z.string().optional(),
    link: z.string().optional(),
    link_img: z.string().optional(),
    user_id: z.number().optional(),
    tool_id: z.number().optional(),
  }),
};

export default bookmarkSchemas;