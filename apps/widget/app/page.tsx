"use client"
import {useQuery} from "convex/react"
import {api} from "@workspace/backend/_generated/api"

export default function Page() {
  const users = useQuery(api.users.getMany);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <p>apps/widget</p>
      <div className="mt-4 flex item-center flex-col gap-2 justify-center  p-4">
      {JSON.stringify(users, null, 2)}
       </div>
    </div>

  ) 
}

