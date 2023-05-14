import { Inter } from "next/font/google";
import { Dispatch, SetStateAction, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

type Todo = {
  id: number;
  title: string;
  isDone: boolean;
};

type Props = {
  todoItem: Todo;
  selectedTodo: Todo;
  setSelectedTodo: Dispatch<SetStateAction<Todo>>;
  handleEdit: (selectedTodo: Todo) => Promise<void>;
  handleToggleIsDone: (id: number) => Promise<void>;
  handleRemove: (id: number) => Promise<void>;
};

// 外にかく
const API_ENDPOINT = "http://localhost:5000";

export function Todolist(props: Props) {
  const {
    todoItem,
    selectedTodo,
    setSelectedTodo,
    handleEdit,
    handleRemove,
    handleToggleIsDone,
  } = props;

  return (
    <li>
      <input
        type="checkbox"
        checked={todoItem.isDone}
        onChange={() => handleToggleIsDone(todoItem.id)}
      />
      {selectedTodo?.id !== todoItem.id ? (
        <>
          <p>{todoItem.title}</p>
          <button
            onClick={() => {
              setSelectedTodo(todoItem);
            }}
          >
            編集する
          </button>
          <button onClick={() => handleRemove(todoItem.id)}>削除</button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={selectedTodo?.title}
            onChange={(e) =>
              setSelectedTodo((prev) => ({
                ...prev!,
                title: e.target.value,
              }))
            }
            disabled={todoItem.isDone}
          />
          <button onClick={() => handleEdit(selectedTodo)}>完了</button>
          <button
            onClick={() => {
              setSelectedTodo(undefined);
            }}
          >
            キャンセル
          </button>
        </>
      )}
    </li>
  );
}
