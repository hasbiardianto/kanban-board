"use client";

import { useEffect, useState } from "react";
import PlusIcon from "./components/icons/PlusIcon";
import { withAuth } from "./components/withAuth";
import Modal from "./components/Modal";
import { fetchTodos } from "./api/todos/route";
import { AdjacentIds, Item, Todo } from "./type";
import { CreateGroupForm } from "./components/forms/CreateGroupForm";
import { GroupContainer } from "./components/container/GroupContainer";
import { DropArea } from "./components/DropArea";
import { moveItem } from "./api/items/route";

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showArea, setShowArea] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeItem, setActiveItem] = useState<number>(0);
  const [targetTodoId, setTargetTodoId] = useState<number>(0);
  const [oldTodoId, setOldTodoId] = useState<number>(0);
  const [movedItem, setMovedItem] = useState<Item>();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("auth_token");
      setIsAuthenticated(!!token);
    };

    checkAuth();

    getTodos();

    window.addEventListener("storage", checkAuth);
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const toggleShow = () => {
    setShowModal(!showModal);
  };

  const handleTodosCreated = (newTodo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const getTodos = async () => {
    const token = localStorage.getItem("auth_token");
    const todos = (await fetchTodos(token)) as Todo[];
    setTodos(todos);
  };

  const onDrop = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      const item = await moveItem(activeItem, oldTodoId, token, targetTodoId);
      setMovedItem(item);
    } catch (error) {
      throw error;
    }
  };

  return (
    <main className="flex flex-col">
      <div className="border-b-2">
        <div className="flex justify-between items-center mx-4 px-2 py-4">
          <div className="inline-flex gap-2">
            <h1 className="font-bold text-xl">Product Roadmap</h1>
            <button
              className="flex items-center gap-2 bg-primary text-white rounded-lg text-xs px-4 py-1"
              onClick={toggleShow}
            >
              <PlusIcon />
              Add New Group
            </button>
          </div>
          {showModal && (
            <Modal>
              <CreateGroupForm
                onCancel={toggleShow}
                onTodoCreated={handleTodosCreated}
              />
            </Modal>
          )}
        </div>
      </div>
      <div className="m-4 overflow-x-auto min-h-screen">
        <div className="flex gap-4 min-w-max">
          {todos.map((todo) => (
            <div key={todo.id} className="flex-shrink-0">
              <GroupContainer
                todo={todo}
                todos={todos}
                movedItem={movedItem}
                setShowArea={setShowArea}
                setActiveItem={setActiveItem}
                setOldTodoId={setOldTodoId}
              />
              <DropArea
                showArea={showArea}
                setShowArea={setShowArea}
                setTargetTodoId={setTargetTodoId}
                onDrop={onDrop}
                todo={todo}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default withAuth(Home);
