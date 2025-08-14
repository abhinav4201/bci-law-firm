import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." })
    .regex(/^\+?[0-9\s-()]+$/, {
      message: "Please enter a valid phone number.",
    }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
