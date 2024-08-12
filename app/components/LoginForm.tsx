"use client";

import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Spinner from "./Spinner";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col p-2 rounded mx-2 items-center"
    >
      <div className="p-2 md:w-[500px]">
        <p className="text-xl text-gray-400 p-2">
          You need login first. Please fill requirements bellow to use kanban board.
        </p>
        {error && <p className="p-2 text-red-600 font-semibold">{error}</p>}
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
        <button
          type="submit"
          disabled={isLoading}
          className=" bg-primary py-2 px-4 rounded-lg text-white my-2 m-2"
        >
          {isLoading ? <Spinner /> : "Login"}
        </button>
      </div>
      <p>Dont Have a Account? <a href="/auth/signup" className="text-blue-500 hover:underline">Create one</a></p>
    </form>
  );
}
