"use client"
import { cn } from "@/lib/utils"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"


export default function AuthButton({
        page,
        signInMessage,
        signUpMessage,
        signOutMessage} : 
    {
        page: string;
        signInMessage: string;
        signUpMessage: string;
        signOutMessage: string;}){
    const {data : session, status} = useSession()
    const isAutenticated = status === "authenticated"

    return(
        <>
        { !isAutenticated ? (
            <Link
                href={page === "register" ? `login` : "register" }
                className={cn (
                    buttonVariants({variant: "ghost"}),
                    "absolute right-4 top-4 md:right-8 md:top-8"
                )}
            >
                {page === "login" ? signUpMessage : signInMessage }
            </Link>    
        ): (
            <Button
            onClick={() => signOut({callbackUrl: "/"})}
            className={cn(
                buttonVariants({variant: "ghost"}),
                "absolute right-4 top-4 md:right-8 md:top-8"
            )}
            >
            {signOutMessage}
            </Button>
        )}
        </>
    )
}