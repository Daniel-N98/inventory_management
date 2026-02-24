"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { verifyUserEmail } from "@/lib/api/users.api";
import toast from "react-hot-toast";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    async function attemptVerification() {
      const verified: boolean = await verifyUserEmail(token!);
      if (verified) {
        toast.success("Your email has been verified.");
        router.push("/dashboard");
      } else {
        toast.error("Could not verify email.");
        router.push("/login");
      }
    }

    attemptVerification();
  }, [searchParams, router]);

  return <p>Verifying your email...</p>;
}