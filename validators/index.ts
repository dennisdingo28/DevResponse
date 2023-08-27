import * as z from "zod";


export const RegisterValidator = z.object({
    name:z.string({required_error:"Username is required"}).min(2,"Username must be at least 2 characters long !"),
    email:z.string({required_error:"Email is required"}).email("You must provide a valid email !"),
    password:z.string({required_error:"Password is required"}).min(4,"Password must be at least 4 characters long !"),
});
export type RegisterRequest = z.infer<typeof RegisterValidator>;


export const LoginValidator = z.object({
    email:z.string({required_error:"Email is required"}).email("You must provide a valid email !"),
    password:z.string({required_error:"Password is required"}).min(4,"Password must be at least 4 characters long !"),
});
export type LoginRequest = z.infer<typeof LoginValidator>;


export const BugValidator = z.object({
    title:z.string({required_error:"A bug title is required"}).min(1,"Title must be at least 1 character long !"),
    description:z.optional(z.string().min(1,"Description must be at least 1 character long !")),
    imageUrl:z.optional(z.string()),
    tags: z.array(z.string().min(1,"Tag must be at least 1 character long !")),
    code: z.optional(z.string().min(1,"The code must be at least 1 character long !")),
    language: z.optional(z.string()),
});
export type BugRequest = z.infer<typeof BugValidator>;


export const CommentValidator = z.object({
  bugId: z.string({required_error:"You must provide a valid bug id"}),
  userId: z.string({required_error:"You must provide an user id"}),
  commentText: z.string({required_error:"You must provide a comment text"}).min(1,"Comment must be at least 1 character long !"), 
  imageUrl: z.optional(z.string()),
});
export type CommentRequest = z.infer<typeof CommentValidator>;