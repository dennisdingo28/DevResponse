import prismadb from "@/lib/db";
import { NextResponse } from "next/server"

export async function POST(req: Request,{params}:{params:{id: string}}){
    try{
        const payload = await req.json();
        const bugId = params.id;
        if(!payload || !bugId || bugId.trim()==='' || !payload.relevant)
            return new NextResponse("Invalid payload body !",{status:400})
        
        await prismadb.bug.updateMany({
            where:{
                id:bugId,
            },
            data:{
                relevant:payload.relevant,
            },
        });

        return NextResponse.json({msg:"Marked as relevant !",ok:true},{status:200});
    
    }catch(err){
        return new NextResponse("Something went wrong. Please try again later!",{status:500})
    }
}