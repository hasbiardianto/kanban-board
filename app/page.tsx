"use client";

import { useEffect, useState } from "react";
import PlusIcon from "./components/PlusIcon";
import { withAuth } from "./components/withAuth";
import Modal from "./components/Modal";
import { fetchTodos } from "./api/todos/route";
import { Todo } from "./type";
import { CreateGroupForm } from "./components/forms/CreateGroupForm";

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      setIsAuthenticated(!!token);
    };

    checkAuth();

    getTodos();

    window.addEventListener("storage", checkAuth);
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const toogleShow = () => {
    setShowModal(!showModal);
  };

  const getTodos = async () => {
    const token = localStorage.getItem("authToken");
    const todos = (await fetchTodos(token)) as Todo[];
    return todos;
  };

  return (
    <main className="flex flex-col">
      <div className="w-screen border-b-2">
        <div className="flex justify-between items-center mx-4 px-2 py-4">
          <div className="inline-flex gap-2">
            <h1 className="font-bold text-xl">Product Roadmap</h1>
            <button
              className="flex items-center gap-2 bg-primary text-white rounded-lg text-xs px-4 py-1"
              onClick={toogleShow}
            >
              <PlusIcon />
              Add New Group
            </button>
          </div>

          {showModal && (
            <Modal>
              <CreateGroupForm onCancel={toogleShow}/>
            </Modal>
          )}
        </div>
      </div>
    </main>
  );
}

export default withAuth(Home);
