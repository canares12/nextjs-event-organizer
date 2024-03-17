import { z } from "zod";

const requiredString = z.string().min(1, "Required");
const numericRequiredString = requiredString.regex(/^\d+$/, "Must be a number");

export const createUserSchema = z.object({
  clerkId: requiredString,
  email: requiredString.max(100).email(),
  username: requiredString.max(100),
  firstName: requiredString.max(100),
  lastName: requiredString.max(100),
  photo: requiredString,
});

export type CreateUserValues = z.infer<typeof createUserSchema>;
