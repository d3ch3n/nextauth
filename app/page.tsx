import AuthButton from "@/components/authButton";
import ClientSession from "@/components/client-component-auth";
import ServerSession from "@/components/server-component-auth";


export default async function Home() {

  return (
    <>
    <div className="m-12">
          <AuthButton page="register" ></AuthButton>
    </div>
    <ClientSession></ClientSession>
    <ServerSession></ServerSession>
    </>
  );
}
