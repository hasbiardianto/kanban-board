"use client";

import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const { signup, isLoading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(name, email, password, confPassword);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nama"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <input
        type="confirmation_password"
        value={confPassword}
        onChange={(e) => setConfPassword(e.target.value)}
        placeholder="confirmation_Password"
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Register"}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
}
