"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PlusIcon from "./components/PlusIcon";
import { withAuth } from "./components/withAuth";
import { useAuth } from "./hooks/useAuth";
import { LogoutButton } from "./components/LogoutButton";

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      setIsAuthenticated(!!token);
    };

    checkAuth();

    window.addEventListener("storage", checkAuth);
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  return (
    <main className="flex flex-col">
      <div className="w-screen border-b-2">
        <div className="flex justify-between items-center mx-4 px-2 py-4">
          <div className="inline-flex gap-2">
            <h1 className="font-semibold text-xl">Product Roadmap</h1>
            <button className="flex items-center gap-2 bg-primary text-white rounded-lg text-xs px-4 py-2">
              <PlusIcon />
              Add New Group
            </button>
          </div>
          {isAuthenticated && <LogoutButton />}
        </div>
      </div>
    </main>
  );
}

export default withAuth(Home);
