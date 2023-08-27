import prismadb from "@/lib/db";
import { CommentRequest, CommentValidator } from "@/validators";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request,{params}:{params:{id: string}}){
    try{
        const payload: CommentRequest = await req.json();
        CommentValidator.parse(payload);

        const newComment = await prismadb.comment.create({
            data:{
                bugId: payload.bugId,
                userId: payload.userId,
                commentText: payload.commentText,
                imageUrl:payload.imageUrl,
            },
            include:{
                user:true,
            }
        });

        return NextResponse.json({msg:"Comment was successfully added!",comment:newComment,ok:true},{status:200});
    }catch(err){
        if(err instanceof ZodError)
            return new NextResponse(err.issues[0].message,{status:400});
        return new NextResponse("Something went wrong. Please try again later!",{status:500})
    }
}