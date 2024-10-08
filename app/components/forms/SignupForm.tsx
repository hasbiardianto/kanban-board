"use client";

import React, { useState } from "react";
import Spinner from "../Spinner";
import { useRouter } from "next/navigation";

export function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

  const router = useRouter();

  const signup = async (
    name: string,
    email: string,
    password: string,
    confPassword: string
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login gagal");
      }

      const data = await response.json();
      const { auth_token } = data;
      localStorage.setItem("auth_token", auth_token);
      router.push("/");
    } catch (error) {
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(name, email, password, confPassword);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col p-2 rounded mx-2 items-center"
    >
      <div className="p-2 md:w-[500px]">
        <p className="text-xl text-gray-400 p-2">
          You need Signup first. Please fill requirements bellow to use kanban
          board.
        </p>
        {error && <p className="p-2 text-red-600 font-semibold">{error}</p>}
        <div className="flex flex-col p-2">
          <label htmlFor="name">Name</label>
          <input
            className="p-2 border-2 rounded"
            id="name"
            name="name"
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
        </div>
        <div className="flex flex-col p-2">
          <label htmlFor="email">Email</label>
          <input
            className="p-2 border-2 rounded"
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="flex flex-col p-2">
          <label htmlFor="password">Password</label>
          <input
            className="p-2 border-2 rounded"
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div className="flex flex-col p-2">
          <label htmlFor="confPassword">Confirmation Password</label>
          <input
            className="p-2 border-2 rounded"
            id="confPassword"
            name="confPassword"
            type="password"
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
            placeholder="Confirmation Password"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className=" bg-primary py-2 px-4 rounded-lg text-white my-2 m-2"
        >
          {isLoading ? <Spinner /> : "Signup"}
        </button>
      </div>
      <p>
        Have a Account?{" "}
        <a href="/v1/auth/login" className="text-blue-500 hover:underline">
          Login
        </a>
      </p>
    </form>
  );
}
