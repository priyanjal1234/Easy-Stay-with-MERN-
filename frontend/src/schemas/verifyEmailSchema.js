import { z } from "zod";

const verifyEmailSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  verificationCode: z
    .string()
    .min(1,{message: "Verification Code is required"})
    .max(6, { message: "Verification code must be 6 digits" })
    
});

export default verifyEmailSchema
