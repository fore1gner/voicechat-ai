"use client"
import {useMutation, useQuery} from "convex/react"
import {api} from "@workspace/backend/_generated/api"
import { Button } from "@workspace/ui/components/button";
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";

 
export default function Page() {
  const users = useQuery(api.users.getMany);
  const addUser = useMutation(api.users.add);
  return (
    <>
      <Authenticated>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <p>apps/web</p>
          <div className="mt-4 flex item-center flex-col gap-2 justify-center  p-4">
            {JSON.stringify(users, null, 2)}
            <UserButton />
            <Button onClick={() => addUser()}>Add User</Button>
          </div>
        </div>
      </Authenticated>
      <Unauthenticated>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <p>Please sign in to view users.</p>
          <SignInButton />
        </div>
      </Unauthenticated>
    </>
  ) 
}


