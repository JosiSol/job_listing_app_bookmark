"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/ui_components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/ui_components/ui/card";
import { Input } from "@/ui_components/ui/input";
import { Label } from "@/ui_components/ui/label";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "800"],
});

const LoginForm = ({ className }: { className?: string }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");

  const displayError = error || urlError;

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formdata = new FormData(event.currentTarget);
    const email = formdata.get("email") as string;
    const password = formdata.get("password") as string;

    const res = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else if (res?.ok) {
      router.push("/");
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      await signIn("google", { callbackUrl: "/jobcard" });
    } catch (e: any) {
      setError(e.message || "Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center md:p-10 bg-muted">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-4", className)}>
          <Card>
            <CardHeader>
              <CardTitle
                className={`font-${poppins.className} font-bold text-2xl`}
              >
                Welcome Back,
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignIn}>
                {displayError && (
                  <div role="alert" className="alert alert-error mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 shrink-0 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Invalid Credentials. Please try again.</span>
                  </div>
                )}
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      placeholder="Enter password"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Logging in..." : "Login"}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full py-2 flex items-center justify-center gap-2 border border-gray-400 text-blue-600 rounded-sm hover:bg-gray-100 transition-colors"
                      type="button"
                      onClick={handleGoogleSignIn}
                    >
                      <FcGoogle className="text-2xl" />
                      Login with Google
                    </Button>
                  </div>
                </div>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/signup"
                    className="font-medium text-indigo-700 hover:text-indigo-500 ml-2 items-center"
                  >
                    Sign up
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
