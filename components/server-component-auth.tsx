import { getCurrentUser } from "@/lib/session"

export default async function ServerSession(){
    const user = await getCurrentUser()
    return <>
    {
        
        user !== undefined && (
            <div className="bg-slate-500 border text-white gap-2 h-60 overflow-scroll">
                <h2>Server Component</h2>
                {JSON.stringify(user)}
            </div>
        )
        
    }</>
}