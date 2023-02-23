import { z } from "zod";

const toolSchemas = {
  createSchema: z.object({
    name: z.string(),
    logo: z.string(),
    description: z.string(),
  }),

  updateSchema: z.object({
    name: z.string().optional(),
    logo: z.string().optional(),
    description: z.string().optional(),
  }),
};

export default toolSchemas;