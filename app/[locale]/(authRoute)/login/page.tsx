import { Metadata } from "next"
//import Image from "next/image"
import Link from "next/link"
import {useTranslations} from 'next-intl';

//import { cn } from "@/lib/utils"
//import { buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "@/components/user-auth-form"
import AuthButton from "@/components/authButton"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function AuthenticationPage() {
  const lang = useTranslations('Login')
  return (
    <>
      <div className="md:hidden">
       
      </div>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <AuthButton page="login" signInMessage={lang("SignIn")} signUpMessage={lang("SignUp")} signOutMessage={lang("SignOut")}/>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Heimdall
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;{lang("heimdallMessage")}.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
              {lang("SignIn")}
              </h1>
              <p className="text-sm text-muted-foreground">
                {lang("loginmessage")}
              </p>
            </div>
             <UserAuthForm className="" buttonLabel={lang("loginButtonLabel")}/>
            <p className="px-8 text-center text-sm text-muted-foreground">
              {lang("termsOfService1")}{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                {lang("termsOfService2")}
              </Link>{" "}
              {lang("and")}{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                {lang("termsOfService3")}
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}