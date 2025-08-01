"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import OtpInput from "react-otp-input";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(59);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || otp.length < 4) {
      setError("Please enter a valid code.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "https://akil-backend.onrender.com/verify-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, OTP: otp }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Invalid verification code.");
      }
      alert("Email verified successfully! You can now log in.");
      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (countdown > 0) return;
    setCountdown(59);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 text-center bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold">Verify Email</h1>
        <p className="text-gray-600">
          We've sent a verification code to {email}. Please enter the code here.
        </p>

        <form
          onSubmit={handleVerify}
          className="flex flex-col items-center justify-between space-y-6"
        >
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span className="mx-2"></span>}
            renderInput={(props) => <input {...props} />}
            inputStyle="!w-14 h-14 text-2xl border rounded-md text-center"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading || otp.length < 4}
            className="w-full px-4 py-3 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? "Verifying..." : "Continue"}
          </button>
        </form>

        <p className="text-sm text-gray-500">
          {countdown > 0 ? (
            `You can request to Resend code in 0:${countdown
              .toString()
              .padStart(2, "0")}`
          ) : (
            <button
              onClick={handleResendCode}
              className="text-blue-500 hover:underline"
            >
              Resend code
            </button>
          )}
        </p>
      </div>
    </div>
  );
}
