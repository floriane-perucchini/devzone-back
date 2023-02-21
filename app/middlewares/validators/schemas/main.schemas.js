import { z } from "zod";

const mainSchemas = {
  loginSchema: z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
  }),
};

export default mainSchemas;
