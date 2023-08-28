import AuthorizationToken from "@/lib/api/middleware/AuthorzationToken";
import prismadb from "@/lib/db";
import { Bug } from "@prisma/client";
import { JsonWebTokenError } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request,{params}:{params:{id: string}}){
    try{
        const payload = await req.json();
        const authorizationToken = req.headers.get("authorization")?.split(" ")[1] || "";
        AuthorizationToken(authorizationToken);

        if(!payload.bugId || payload.bugId.trim()==='' || !payload.userId || payload.userId.trim()==='' || !payload.bug || Object.keys(payload).length<0)
            throw new Error("Invalid bug payload");

        //new share instance
        await prismadb.share.create({
            data:{
                bugId:payload.bugId,
                userId:payload.userId,
            },
        });
        const bug: Bug = payload.bug;

        const createSharedBug = await prismadb.bug.create({
            data:{
                title:bug.title,
                description:bug.description,
                imageUrl:bug.imageUrl,
                tags:bug.tags,
                userId:payload.userId,
                code:bug.code,
                language:bug.language,
                isShared:true,
            },
        });
        return NextResponse.json({msg:"Bug was sucessfully shared!",bug:createSharedBug},{status:200});

    }catch(err){
        console.log(err);
        if(err instanceof JsonWebTokenError)
            return new NextResponse("Invalid authorization token",{status:400})
        if(err instanceof ZodError)
            return new NextResponse(err.issues[0].message,{status:400});
        return new NextResponse("Something went wrong. Please try again later!",{status:500})
    }
}