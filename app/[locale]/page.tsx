import AuthButton from "@/components/authButton";
import ClientSession from "@/components/client-component-auth";
import ServerSession from "@/components/server-component-auth";
import {useTranslations} from 'next-intl';
import {useFormatter} from 'next-intl';

export default function Home() {
  const lang = useTranslations('Login')
  const formatDate = useFormatter();
  const dateTime = new Date

  

  return (
    <>
    <div className="m-12">
    <AuthButton page="register" signInMessage={lang("SignIn")} signUpMessage={lang("SignUp")} signOutMessage={lang("SignOut")}/>
    </div>
    { 
        formatDate.dateTime(dateTime, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
        })
    }{" "}
    {formatDate.dateTime(dateTime, {hour: 'numeric', minute: 'numeric'})}
    <ClientSession></ClientSession>
    <ServerSession></ServerSession>
    </>
  );
}
