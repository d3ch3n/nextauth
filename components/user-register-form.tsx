"use client"

import { useState } from "react"
import {cn} from "@/lib/utils"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";





interface userAuthFormProps extends React.HTMLAttributes<HTMLDivElement>{
    className: string;
    buttonLabel: string;
}

interface IUser {
    name: string,
    username: string,
    password: string,
    admin: boolean,
}

export function UserRegisterForm({
    className, buttonLabel,...props
}: userAuthFormProps){
    
    const { toast }  = useToast()
    const router = useRouter()
    const [data, setData] = useState<IUser>({
        name: "",
        username: "",
        password: "",
        admin: false
    }) 
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        setIsLoading(true);
       
        const request = await fetch("/api/v1/user",{
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        //console.log(JSON.stringify(data))
        const response = await request.json();
        //console.log(request.ok)
        if(!request.ok){
            toast({
                title: "Oooops",
                description: response.error,
                variant: "destructive",
                action: (
                    <ToastAction altText="Tente Novamente">Tente Novamente</ToastAction>
                ),
            });
        }else{
            //console.log(response);
            router.push("/login")
        }
            

        //setTimeout(() => {
        //    setIsLoading(false)
        //},5000)

        setData({
            name: "",
            username: "",
            password: "",
            admin: false
        })
    
        setIsLoading(false);
    }
    
    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setData((prev) => {
            return {...prev,[e.target.name]:e.target.value}
        })
    }

    return (
        <div className={cn("grid gap-6", className)}{...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="name">
                            Name
                        </Label>
                        <Input 
                            id="name"
                            placeholder="name"
                            type="text"
                            autoCapitalize="none"
                            autoCorrect="off"
                            disabled={isLoading}
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="username">
                            Email
                        </Label>
                        <Input 
                            id="username"
                            placeholder="name@example.com.br"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            name="username"
                            value={data.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="password">
                            Email
                        </Label>
                        <Input 
                            id="password"
                            type="password"
                            autoCapitalize="none"
                            autoComplete="password"
                            autoCorrect="off"
                            disabled={isLoading}
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            placeholder="password"
                        />
                        <Button disabled={isLoading}>
                            {isLoading && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {buttonLabel}
                        </Button>

                    </div>
                </div>
            </form>
        </div>
    )
}

