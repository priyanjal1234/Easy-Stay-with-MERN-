import { z } from "zod";

const registerSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),

  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(20, { message: "Password must be less than 20 characters" }),

  address: z
    .string()
    .min(1, { message: "Address is required" })
    .max(200, { message: "Address must be less than 200 characters" }),

  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(10, { message: "Phone number must be less than 10 digits" })
    .regex(/^\d+$/, { message: "Phone number must only contain digits" }), // Validate if phone number contains only digits
});

export default registerSchema;
