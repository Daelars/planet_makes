"use client";

import { SignUp } from "@clerk/nextjs";
import { useEffect } from "react";
import { useSignUp, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { isLoaded: isSignUpLoaded, signUp } = useSignUp();
  const router = useRouter();

  // Sync user to your database after successful sign-up
  useEffect(() => {
    const syncUser = async () => {
      if (isLoaded && isSignedIn && user) {
        try {
          // Call your API route to create or update the user in your database
          const response = await fetch("/api/auth/sign-up", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            console.log("User synced with database");
            // Redirect to profile or dashboard after successful sync
            router.push("/dashboard");
          } else {
            console.error("Error syncing user:", await response.json());
          }
        } catch (error) {
          console.error("Error syncing user with database:", error);
        }
      }
    };

    syncUser();
  }, [isLoaded, isSignedIn, user, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center">
          <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-[var(--foreground)]">
            Create your account
          </h1>
        </div>
        <div className="mt-8">
          <SignUp
            path="/sign-up"
            routing="path"
            signInUrl="/sign-in"
            redirectUrl="/dashboard"
          />
        </div>
      </div>
    </div>
  );
}
