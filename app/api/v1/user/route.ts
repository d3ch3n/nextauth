import { NextRequest, NextResponse } from "next/server";
import { db as prisma } from "@/lib/adapterPrisma";
//import { verifyJwt } from "@/lib/jwt";
import * as bcrypt from "bcrypt";



//return all customers
export async function GET(request: Request) {
    const accessToken = request.headers.get("authorization")
    //if(!accessToken || !verifyJwt(accessToken)){
    //    return NextResponse.json({ error: "unauthorized"}, { status:401 })
    //}
    
    const getUsers = await prisma.user.findMany({
        where: {
            NOT: {
                name: "Internal Service"
            },
        },
        orderBy: [
            {
                id: 'asc',
            }
        ],
        
    });
    return NextResponse.json({ user: getUsers }, { status: 200 });
}

interface RequestBody{
    name: string;
    username: string;
    password: string;
    admin: boolean;
}

export async function POST(request:Request){
    const accessToken = request.headers.get("authorization")
    //if(!accessToken || !verifyJwt(accessToken)){
    //    return NextResponse.json({ error: "unauthorized"}, { status:401 })
    //}

    const body:RequestBody = await request.json();

    const validateUser = await prisma.user.findUnique({
        where: {
            email: body.username.toLowerCase(),
        },
    });
                          
    if (validateUser){
        return NextResponse.json({user: validateUser}, { status: 200 })
    }
    else{
        //colocar lógica para registro
        if(body.username == "" || body.password.length < 6){
            return NextResponse.json({user: "Parametros inválidos"}, {status: 400})
        }else{
        const addUser = await prisma.user.create({
            data: {
                email: body.username,
                name: body.name.toUpperCase(),
                hashPassword: await bcrypt.hash(body.password,10),
                admin: body.admin,
            },
        });
        return NextResponse.json({user: addUser}, { status: 201 })
        }
    }    
}