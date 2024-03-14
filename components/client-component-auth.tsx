"use client"

import { useSession } from "next-auth/react"

export default function ClientSession(){
    const session = useSession()
    return <>
    {
        session?.data && (
            <div className="bg-slate-50 border gap-2 h-60 overflow-scroll">
                <h2>Client Component</h2>
                {JSON.stringify(session)}
            </div>
        )
    }</>
}