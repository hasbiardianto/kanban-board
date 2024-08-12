"use client";

import PlusIcon from "./components/PlusIcon";
import { useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { authToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authToken) {
      router.push('/auth/login');
    }
  }, [authToken, router]);

  if (!authToken) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex">
      <div className="w-screen border-b-2">
        <div className="inline-flex mx-4 px-2 py-4 gap-2">
          <h1 className="font-semibold text-xl">Product Roadmap</h1>
          <button className="flex items-center gap-2 bg-primary text-white rounded-lg text-xs px-4 py-2">
            <PlusIcon />
            Add New Group
          </button>
        </div>
      </div>
    </main>
  );
}
