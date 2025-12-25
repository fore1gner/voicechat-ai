"use client";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { SignInView } from "@/modules/auth/ui/views/sign-in-view";
import { AuthLayout } from "../layouts/auth-layout";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
        <AuthLoading>
            <AuthLayout>
                <div >
                    <p>Loading...</p>
                </div>
            </AuthLayout>
        </AuthLoading>


        <Authenticated>
            {children}
        </Authenticated>


        <Unauthenticated>
            <AuthLayout>
                <SignInView/>
            </AuthLayout>
        </Unauthenticated>      
        </>
    );
};