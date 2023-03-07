import { z } from "zod";

const userSchemas = {
  updateSchema: z.object({
    // TODO: Make at least one mandatory

    email: z.string().email({ message: "Email must be valid." }).optional(),
    password: z.string().optional(),
    firstname: z
      .string()
      .min(1, { message: "Firstname must be at least 1 character." })
      .optional(),
    lastname: z
      .string()
      .min(1, { message: "Lastname must be at least 1 character." })
      .optional(),
    username: z
      .string()
      .min(1, { message: "Username must be at least 1 character." })
      .optional(),
    website: z
      .string()
      .regex(
        new RegExp(
          "(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]+\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+\\.[^\\s]{2,})"
        )
      )
      .optional(),
  }),
};

export default userSchemas;
