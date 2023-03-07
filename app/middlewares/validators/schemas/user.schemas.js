import { z } from "zod";

const userSchemas = {
  createSchema: z.object({
    email: z.string().email({ message: "Email must be valid." }),
    password: z.string(),
    firstname: z
      .string()
      .min(1, { message: "Firstname must be at least 1 character." }),
    lastname: z.string(),
    pseudo: z.string(),
    avatar: z.string(),
  }),
  updateSchema: z.object({
    // TODO: Make at least one mandatory
    email: z.string().email({ message: "Email must be valid." }).optional(),
    password: z.string().optional(),
    firstname: z
      .string()
      .min(1, { message: "Firstname must be at least 1 character." })
      .optional(),
    lastname: z.string().optional(),
    pseudo: z.string().optional(),
    avatar: z.string().optional(),
  }),
};

export default userSchemas;
