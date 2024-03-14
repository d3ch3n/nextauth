import { NextResponse } from "next/server";
import prisma from "@/lib/prismaConnect";
import * as bcrypt from "bcrypt";
import { signJwtAccessToken } from "@/lib/jwt";

interface RequestBody{
    username: string;
    password: string;
}

export async function POST(request:Request) {
    const body:RequestBody = await request.json();
    console.log("body")
    console.log(body.username)
    console.log(body.password)
    
    const user = await prisma.user.findUnique({
        where:{
            email:body.username,
        }
    })
    if(user && (await bcrypt.compare(body.password, user.hashPassword))){
        const {hashPassword, ...userWithoutPass} = user
        const {emailVerified, ...userWithoutPassAndVerifyed} = userWithoutPass
        const {admin, ...userWithoutPassAndVerifyedAndAdmin} = userWithoutPassAndVerifyed
        const accessToken = signJwtAccessToken(userWithoutPassAndVerifyedAndAdmin)
        const result = {
            ...userWithoutPassAndVerifyedAndAdmin,
            accessToken,
        }
        return new NextResponse(JSON.stringify(result));
    }
    else{
        return new NextResponse(JSON.stringify("Not Authorized"))
    }
    
}