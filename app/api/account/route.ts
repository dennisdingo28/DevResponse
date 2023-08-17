import {NextResponse} from "next/server";

export async function POST(req: Request){
    try{
        const data = await req.json();
        console.log(data);

        return NextResponse.json({msg:"Account was successfully created !"},{status:200});
        
    }catch(err){
        console.log(err);
    }
}