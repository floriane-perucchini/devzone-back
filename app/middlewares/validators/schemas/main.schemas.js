import { z } from "zod";

const mainSchemas = {
  loginSchema: z.object({
    username: z.string().trim().optional(),
    email: z
      .string()
      .email({ message: "Your email format is incorrect." })
      .trim()
      .optional(),
    password: z
      .string()
      .min(1, { message: "You must fill your password." })
      .trim(),
  }),

  signupSchema: z
    .object({
      email: z.string().email({ message: "Email must be valid." }).trim(),
      password: z
        .string()
        .regex(
          new RegExp(
            "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#.?&])[A-Za-z\\d@$!%*#.?&]{8,}$"
          ),
          {
            message:
              "Password must contain 8 caracters, at least one letter, one number and a special caracter.",
          }
        )
        .trim(),
      confirmedPassword: z.string().trim(),
      username: z
        .string()
        .min(2, { message: "Username must be at least 2 character." })
        .trim(),
    })
    .refine((signup) => signup.password === signup.confirmedPassword, {
      message: "Passwords don't match.",
      path: ["confirmedPassword"],
    })
    .or(
      z
        .object({
          email: z.string().email({ message: "Email must be valid." }).trim(),
          password: z
            .string()
            .regex(
              new RegExp(
                "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#.?&])[A-Za-z\\d@$!%*#.?&]{8,}$"
              ),
              {
                message:
                  "Password must contain 8 caracters, at least one letter, one number and a special caracter.",
              }
            )
            .trim(),
          confirmedPassword: z.string().trim(),
        })
        .refine((signup) => signup.password === signup.confirmedPassword, {
          message: "Passwords don't match.",
          path: ["confirmedPassword"],
        })
    )
    .or(
      z
        .object({
          password: z
            .string()
            .regex(
              new RegExp(
                "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#.?&])[A-Za-z\\d@$!%*#.?&]{8,}$"
              ),
              {
                message:
                  "Password must contain 8 caracters, at least one letter, one number and a special caracter.",
              }
            )
            .trim(),
          confirmedPassword: z.string().trim(),
          username: z
            .string()
            .min(2, { message: "Username must be at least 2 character." })
            .trim(),
        })
        .refine((signup) => signup.password === signup.confirmedPassword, {
          message: "Passwords don't match.",
          path: ["confirmedPassword"],
        })
    ),
};

export default mainSchemas;
