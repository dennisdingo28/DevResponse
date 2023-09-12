import AuthorizationToken from "@/lib/api/middleware/AuthorzationToken";
import prismadb from "@/lib/db";
import { ConversationRequest, ConversationValidator } from "@/validators";
import { JsonWebTokenError } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { BiObjectsVerticalCenter } from "react-icons/bi";
import { ZodError } from "zod";

export async function POST(req: Request){
    try{
        const payload: ConversationRequest = await req.json();
        const authorizationToken = req.headers.get("authorization")?.split(" ")[1] || "";
        const user = AuthorizationToken(authorizationToken);
        ConversationValidator.parse(payload);
        const conversationAlreadyExists = await prismadb.conversation.findUnique({
            where:{
                userId_recipientId:{
                    userId: user.id,
                    recipientId:payload.recipientId,
                },
            },
        });
        if(conversationAlreadyExists)
            return NextResponse.json({msg:"Conversation already exists !"},{status:200});

        const newConversation = await prismadb.conversation.create({
            data:{
                userId:payload.userId,
                recipientId:payload.recipientId,
                messages:[],
            },
        });

        return NextResponse.json({msg:"New conversation was created !"},{status:200});
    }catch(err){
        console.log("new ",err);
        
        if(err instanceof JsonWebTokenError)
        return new NextResponse("Invalid authorization token",{status:400})

        if(err instanceof ZodError)
            return new NextResponse(err.issues[0].message,{status:400});
        return new NextResponse("Something went wrong. Please try again later!",{status:500})
    }
}