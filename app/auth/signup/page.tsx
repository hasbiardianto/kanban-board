"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RegisterForm } from "../../components/SignupForm";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      router.push("/");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Register</h1>
      <RegisterForm />
    </div>
  );
}
