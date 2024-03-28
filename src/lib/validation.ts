import { z } from "zod";

const requiredString = z.string().min(1, "Required");
const numericRequiredString = requiredString.regex(/^\d+$/, "Must be a number");
const numericString = z.string().regex(/^\d+$/, "Must be a number");

export const eventFormSchema = z.object({
  title: requiredString.max(100),
  description: requiredString.max(500),
  location: requiredString.max(100),
  imageUrl: requiredString,
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string().max(100),
  price: numericString.max(9, "Must not exceed 9 digits").optional(),
  url: z.string().url(),
  isFree: z.boolean(),
});

export type eventFormValues = z.infer<typeof eventFormSchema>;

