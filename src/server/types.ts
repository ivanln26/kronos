import { z } from "zod";

export const uccEmail = z.string().regex(/[0-9]{7}@ucc.edu.ar/);

export const user = z.object({
  name: z.string().max(120),
  lastName: z.string().max(120),
  email: uccEmail,
  role: z.enum(["admin", "student", "professor"]),
}).transform(({ email, ...fields }) => {
  const ucc = email.split("@")[0];
  return {
    ...fields,
    ucc,
    email,
  };
});

export type User = z.infer<typeof user>;
