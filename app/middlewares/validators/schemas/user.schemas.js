import { z } from "zod";

const userSchemas = {
  createSchema: z.object({
    email: z.string(),
    password: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    pseudo: z.string(),
    avatar: z.string(),
  }),
  updateSchema: z.object({
    email: z.string(),
    password: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    pseudo: z.string(),
    avatar: z.string(),
  }),
};

export default userSchemas;
