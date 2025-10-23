import { z } from "zod";

export const otpSchema = z.object({
  otp: z
    .string()
    .min(5, "OTP должен содержать 5 цифр")
    .max(5, "OTP должен содержать 5 цифр")
    .regex(/^\d{5}$/, "OTP должен содержать только цифры"),
});

export type OtpFormData = z.infer<typeof otpSchema>;