import { z } from "zod";

const mainSchemas = {
  loginSchema: z.object({
    username: z.string().optional(),
    email: z
      .string()
      .email({ message: "Your email format is incorrect." })
      .optional(),
    password: z.string().min(1, { message: "You must fill your password." }),
  }),

  signupSchema: z
    .object({
      email: z.string().email({ message: "Email must be valid." }),
      password: z
        .string()
        .regex(
          new RegExp(
            "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$"
          ),
          {
            message:
              "Password must contain 8 caracters, at least one letter, one number and a special caracter.",
          }
        ),
      confirmedPassword: z.string(),
      username: z
        .string()
        .min(1, { message: "Username must be at least 1 character." }),
    })
    .refine((data) => data.password === data.confirmedPassword, {
      message: "Passwords don't match",
      path: ["confirmedPassword"],
    }),
};

export default mainSchemas;
