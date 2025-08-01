"use client";
import { Button } from "@/ui_components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/ui_components/ui/card";
import { Input } from "@/ui_components/ui/input";
import { Label } from "@/ui_components/ui/label";
import { Poppins, Epilogue } from "next/font/google";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useRouter } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "800"],
});

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["400", "500", "600", "800"],
});

// Define validation schema for the form
const formSchema = z
  .object({
    fullName: z
      .string()
      .min(2, { message: "Full name must be at least 2 characters." }),
    email: z.email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });
type FormData = z.infer<typeof formSchema>;

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");

    if (data.password !== data.confirmPassword) {
      setError("Password do not match.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("https://akil-backend.onrender.com/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.fullName,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
          role: "user",
        }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Sign Up Failed");
      }
      router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      await signIn("google", { callbackUrl: "/jobcard" }); // Redirect after Google sign-in
    } catch (error: any) {
      setError(error.message || "Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex justify-center items-center min-h-screen bg-muted p-4 font-${epilogue.className}`}
    >
      <Card className="w-full max-w-md p-6 shadow-lg rounded-lg">
        <CardHeader className="text-center">
          <CardTitle
            className={`text-4xl font-extrabold mb-2 font-${poppins.className}`}
          >
            Sign Up Today!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            className="w-full py-2 flex items-center justify-center gap-2 border border-gray-400 text-blue-600 rounded-sm hover:bg-gray-100 transition-colors"
            type="button"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle className="text-2xl" />
            Sign Up with Google
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-400"></span>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white text-gray-500 px-2">
                Or Sign Up with Email
              </span>
            </div>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label
                htmlFor="fullName"
                className="text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                className="mt-1 block w-full px-3 py-2 border border-gray-400  shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 placeholder:text-gray-400"
                {...form.register("fullName")}
              />
              {form.formState.errors.fullName && (
                <p className="text-red-500 text-xs mt-1">
                  {form.formState.errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                className="mt-1 block w-full px-3 py-2 border border-gray-400  shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 placeholder:text-gray-400"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                className="mt-1 block w-full px-3 py-2 border border-gray-400  shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 placeholder:text-gray-400"
                {...form.register("password")}
              />
              {form.formState.errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Enter Password"
                className="mt-1 block w-full px-3 py-2 border border-gray-400  shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 placeholder:text-gray-400"
                {...form.register("confirmPassword")}
              />
              {form.formState.errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {form.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            {error && (
              <div className="text-red-500 text-sm mt-2 text-center">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full py-2 mt-2"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Continue"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?
            <Link
              href="/login"
              className="font-medium text-indigo-700 hover:text-indigo-500 ml-2"
            >
              Login
            </Link>
          </p>

          <p className="mt-4 text-center text-xs text-gray-500 leading-relaxed mr-1">
            By clicking 'Continue', you acknowledge that you have read and
            accepted our
            <Link href="#" className="underline hover:text-indigo-600 mx-1">
              Terms of Service
            </Link>
            and
            <Link href="#" className="underline hover:text-indigo-600 mx-1">
              Privacy Policy
            </Link>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
