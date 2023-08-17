import * as z from "zod";


export const RegisterValidator = z.object({
    username:z.string().min(2,"Username must be at least 2 characters long !"),
    email:z.string().email("You must provide a valid email !"),
    password:z.string().min(4,"Password must be at least 4 characters long !"),
});
export type RegisterRequest = z.infer<typeof RegisterValidator>;
