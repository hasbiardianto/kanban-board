"use client";

import { LoginForm } from "../../components/LoginForm";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
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
    <div className="flex flex-col min-h-screen justify-center">
      <h1 className="text-center text-3xl">Login</h1>
      <LoginForm />
    </div>
  );
}
