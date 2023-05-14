import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { Form } from "../component/Form";
import { Todolist } from "../component/TodoListItem";

const inter = Inter({ subsets: ["latin"] });

type Todo = {
  id: number;
  title: string;
  isDone: boolean;
};

const API_ENDPOINT = "http://localhost:5000";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo>();

  // 取得
  useEffect(() => {
    const sendGetTodoRequest = async () => {
      const res = await fetch(`${API_ENDPOINT}/todos`, {
        method: "GET",
      });
      const json = await res.json();
      setTodos(json);
    };

    (async () => {
      await sendGetTodoRequest();
    })();
  }, []);

  // 編集
  const handleEdit = async (selectedTodo: Todo) => {
    const res = await fetch(`${API_ENDPOINT}/${selectedTodo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedTodo),
    });
    const data = await res.json();
    setSelectedTodo(undefined);
    setTodos((prev) =>
      [...prev.filter((todo) => todo.id !== selectedTodo.id), data].sort(
        (a, b) => a.id - b.id
      )
    );
  };

  // 完了・未完了
  // patch
  const handleToggleIsDone = async (id: number) => {
    // patch
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return;
    let updatedTodo = { ...todo, isDone: !todo.isDone };
    const res = await fetch(`${API_ENDPOINT}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });
    const data = await res.json();
    setTodos(todos.map((todo) => (todo.id === data.id ? data : todo)));
  };

  // 削除
  const handleRemove = async (id: number) => {
    const isConfirmed = window.confirm("Todoを削除します");

    if (!isConfirmed) return;

    try {
      await fetch(`${API_ENDPOINT}/${id}`, {
        method: "DELETE",
      });
      setTodos((prev) => [...prev.filter((todo) => todo.id !== id)]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.TODOtitle}>TODO</h1>
      <Form />
      <ul>
        {todos.map((todo) => (
          <Todolist
            key={todo.id}
            todoItem={todo}
            selectedTodo={selectedTodo}
            setSelectedTodo={setSelectedTodo}
            handleEdit={handleEdit}
            handleRemove={handleRemove}
            handleToggleIsDone={handleToggleIsDone}
          />
        ))}
      </ul>
    </main>
  );
}
