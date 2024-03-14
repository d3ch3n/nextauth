import { NextAuthOptions } from "next-auth";
import  CredentialProvider  from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
//import { db } from "@/lib/adapterPrisma";
import { db as prisma} from "@/lib/adapterPrisma";
import bcrypt from "bcrypt";
import { signJwtAccessToken } from "./jwt";


export const authOptions : NextAuthOptions = {
    adapter: PrismaAdapter(prisma as any),
    session:{
      strategy: 'jwt',
      maxAge: 60 * 60 * 12,
    },
    jwt:{
      maxAge: 60 * 60 * 12, 
    },
    providers:[
        CredentialProvider({
            name: "credentials",
            credentials:{
                email: { labels: "Email", type: "text", placeholder: "jsmith"},
                password: {labels: "Password", type: "password"},
            },
            async authorize(credentials, req) : Promise<any>{

                if (!credentials?.email ||  !credentials.password) throw new Error('Dados de Login Necessários')

                const user = await prisma.user.findUnique({
                    where:{
                        email: credentials?.email
                    }
                })

                if(!user || !user.hashPassword){
                    throw new Error("Usuário não registrado através de credenciais.")
                }
                const matchPassword = await bcrypt.compare(credentials.password, user.hashPassword)
                
                if(!matchPassword) throw new Error ("Senha Incorreta")
                const {hashPassword, ...userWithoutPass} = user
                const accessToken = signJwtAccessToken(userWithoutPass)
                const result = {
                  ...userWithoutPass,
                  accessToken,
              }
               
                return result
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
    pages:{
        signIn: "/login"
    },
    callbacks:{
        jwt:({token,user}) => {
          if(user){
            const u = user as unknown as any
            return {
              ...token,
              id: u.id,
              admin: u.admin,
              accessToken: u.accessToken
            }
          }
       
        return token
        },
        session:({session, token}) =>{
          return {
            ...session,
            user:{
              ...session.user,
              id: token.id,
              admin: token.admin,
              accessToken: token.accessToken
            }
          }

      }
    }
}

