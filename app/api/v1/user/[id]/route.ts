import { NextResponse } from "next/server";
import prisma from "@/lib/prismaConnect";
import { verifyJwt } from "@/lib/jwt";
import * as bcrypt from "bcrypt";



export async function GET(request: Request, { params }: { params: { id: string } }) {
   const accessToken = request.headers.get("authorization")
   if(!accessToken || !verifyJwt(accessToken)){
     return NextResponse.json({ error: "unauthorized"}, { status:401 })
   }

    const getUser = await prisma.user.findUnique({
        where: {
            id: params.id,
        },
    });
    return NextResponse.json({ user: getUser }, { status: 200 });
}

interface RequestBody{
    name: string;
    username: string;
    password: string;
    emailVerified: boolean;
    admin: boolean;
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const accessToken = request.headers.get("authorization")
    if(!accessToken || !verifyJwt(accessToken)){
      return NextResponse.json({ error: "unauthorized"}, { status:401 })
    }

    const body:RequestBody = await request.json();

        const getUser = await prisma.user.findUnique({
            where: {
                id: params.id,
            },
        });

        if (body.password === "")
        {
            console.log("API Dont change password")

            if(getUser){
                const updateUser = await prisma.user.update({
                    where:{
                        id: params.id,
                    },
                    data: {
                        email: body.username,
                        name: body.name.toUpperCase(), 
                        admin: body.admin,
                    },
                });
                return NextResponse.json({ user: "With id: " + params.id + " was successfully updated" }, { status: 200 });
            }  
            else{
                return NextResponse.json({ user: "With id: " + params.id + " was not found" }, { status: 200 });
            }     
        }
        else{
            console.log("API change password")

            if(getUser){
                const updateUser = await prisma.user.update({
                    where:{
                        id: params.id,
                    },
                    data: {
                        email: body.username,
                        name: body.name.toUpperCase(),
                        hashPassword: await bcrypt.hash(body.password,10), 
                        admin: body.admin,
                    },
                });
                return NextResponse.json({ user: "With id: " + params.id + " was successfully updated" }, { status: 200 });
            }  
            else{
                return NextResponse.json({ user: "With id: " + params.id + " was not found" }, { status: 200 });
            }   
        }
}
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const accessToken = request.headers.get("authorization")
    if(!accessToken || !verifyJwt(accessToken)){
      return NextResponse.json({ error: "unauthorized"}, { status:401 })
    }
    
    if(params.id !== '1' )
    {
        const getUser = await prisma.user.findUnique({
            where: {
                id: params.id,
            },
        });

        if(getUser){
            const deleteCustomer = await prisma.user.delete({
                where: {
                    id: params.id,
                },
            });

            return NextResponse.json({ user: "With id: " + params.id + " was successfully deleted" }, { status: 200 });
        }
        else{
            return NextResponse.json({ user: "With id: " + params.id + " was not found" }, { status: 200 });
        }
    }
    return NextResponse.json({ user: "With id: " + params.id + " can't be deleted" }, { status: 200 });
}