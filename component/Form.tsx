import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import type { FormEventHandler } from "react"

const inter = Inter({ subsets: ['latin'] })

type Todo = {
  id: number,
  title: string,
  isDone: boolean
}

const API_ENDPOINT = "http://localhost:5000/todos"

export function Form() {
  const [title, setTitle] = useState("")
  const [todos, setTodos] = useState<Todo[]>([]);

  // 取得
  // useEffect(() => {
  //   const sendGetTodoRequest = async () => {
  //     const res = await fetch(API_ENDPOINT, {
  //       method: "GET"
  //     });
  //     const json = await res.json();
  //     setTodos(json);
  //   }

  //   (async () => {
  //     await sendGetTodoRequest();
  //   })()
  // }, []);


  // 送信 
  // FormEventHandler<HTMLForm Element>でフォームタグのvalueをとれる
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const newTodo = { title, isDone: false };

    const res = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
    const data = await res.json();
    setTodos((prev) => ([
      ...prev,
      data,
    ]))
  };

  return (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit">追加する</button>
        </form>
  )
};

