import AuthorizationToken from "@/lib/api/middleware/AuthorzationToken";
import prismadb from "@/lib/db";
import {
  ConversationSendRequest,
  ConversationSendValidator,
} from "@/validators";
import { JsonWebTokenError } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request){
  try {
    const payload: ConversationSendRequest = await req.json();
    const authorizationToken = req.headers.get("authorization")?.split(" ")[1] || "";
    const user = AuthorizationToken(authorizationToken);
    ConversationSendValidator.parse(payload);

    // await prismadb.conversation.update({
    //   where: {
    //     userId_recipientId:{
    //       userId:payload.userId,
    //       recipientId:payload.recipientId,
    //     },
    //   },
    //   data: {
    //     messages: {
    //       push: {
            
    //       },
    //     },
    //   },
    // });

    await prismadb.message.create({
      data:{
        conversationId:payload.conversationId,
        userId:payload.userId,
        recipientId:payload.recipientId,
        message:payload.message,
      },
    });

    return NextResponse.json(
      { msg: "Successfully send the message !" },
      { status: 200 }
    );
  } catch (err) {
    console.log("new ", err);

    if (err instanceof JsonWebTokenError)
      return new NextResponse("Invalid authorization token", { status: 400 });

    if (err instanceof ZodError)
      return new NextResponse(err.issues[0].message, { status: 400 });
    return new NextResponse("Something went wrong. Please try again later!", {
      status: 500,
    });
  }
}
