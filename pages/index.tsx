import { Inter } from 'next/font/google'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import { Form } from '../component/Form'
import { Todolist } from '../component/TodoListItem'

const inter = Inter({ subsets: ['latin'] })

type Todo = {
  id: number,
  title: string,
  isDone: boolean
}

const API_ENDPOINT = "http://localhost:5000/todos"

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // 取得
  useEffect(() => {
    const sendGetTodoRequest = async () => {
      const res = await fetch(API_ENDPOINT, {
        method: "GET"
      });
      const json = await res.json();
      setTodos(json);
    }

    (async () => {
      await sendGetTodoRequest();
    })()
  }, []);

  return (
    <main className={styles.main}>
      <h1 className={styles.TODOtitle}>TODO</h1>
      <Form />
      <ul>
        {todos.map((todo) => (
          <Todolist key = {todo} todoItem={todo}/>
        ))}
      </ul>
    </main >
  )
};

