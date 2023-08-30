import { JsonWebTokenError } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import AuthorizationToken from "@/lib/api/middleware/AuthorzationToken";
import prismadb from "@/lib/db";

export async function DELETE(req: Request,{params}:{params:{id: string}}){
    try{
        const bugId = params.id;
        if(!bugId || bugId.trim()==='')
            return new NextResponse("No id was provided. Please try again later!");

        const authorizationToken = req.headers.get("authorization")?.split(" ")[1] || "";
        
        //verfies the provided auth token
        const user = AuthorizationToken(authorizationToken);
        await prismadb.share.deleteMany({
            where:{
                userId: user.id,
                bugId: bugId,
            },
        });
        const bug = await prismadb.bug.findUnique({
            where:{
                id:bugId,
            },
            include:{
                sharedFrom:true,
            },
        });
        if(!bug?.isShared)
            await prismadb.bug.deleteMany({
                where:{
                    id:bugId,
                },
            });
        else{
            const initialSharedPost = await prismadb.bug.findFirst({
                where:{
                    userId:bug.sharedFrom?.id,
                    shares:{
                        some:{userId:user.id},
                    },
                    title:bug.title,
                    description:bug.description,
                    language:bug.language,
                    code:bug.code,
                    imageUrl:bug.imageUrl,
                }
            })
            await prismadb.share.deleteMany({
                where:{
                    userId: user.id,
                    bugId: initialSharedPost?.id,
                },
            });
            await prismadb.bug.deleteMany({
                where:{
                    id:bugId,
                    userId:user.id,
                },
            });
        }

        return NextResponse.json({msg:"Bug was sucessfully deleted"},{status:200});

    }catch(err){
        console.log(err);
        
        if(err instanceof JsonWebTokenError)
            return new NextResponse("Invalid authorization token",{status:400})

        if(err instanceof ZodError)
            return new NextResponse(err.issues[0].message,{status:400});
        return new NextResponse("Something went wrong. Please try again later!",{status:500})
    }
}