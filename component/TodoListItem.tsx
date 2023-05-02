import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

type Todo = {
  id: number,
  title: string,
  isDone: boolean
}

// 外にかく
const API_ENDPOINT = "http://localhost:5000/todos"

export function Todolist(props) {
  // const [title, setTitle] = useState("")
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo>();

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

  // 編集
  const handleEdit = async (selectedTodo: Todo) => {
    const res = await fetch(`${API_ENDPOINT}/${selectedTodo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedTodo)
    });
    const data = await res.json()
    setSelectedTodo(undefined);
    setTodos((prev) => (
      [
        ...prev.filter((todo) => todo.id !== selectedTodo.id),
        data
      ].sort((a, b) => a.id - b.id)
    ))

  };

  // 完了・未完了
  // patch
  const handleToggleIsDone = async (id: number) => {
    // patch
    const todo = todos.find((todo) => todo.id ===id);
    if(!todo) return;
    let updatedTodo = {...todo, isDone:!todo.isDone};
    const res = await fetch(`${API_ENDPOINT}/${id}`,{
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });
    const data = await res.json();
    setTodos(todos.map((todo) => (todo.id ===data.id?data: todo))
    );
  }
  
  // const handleToggleIsDone = (id: number) => {
  //   let updatedTodo = todos.map((todo) => {
  //     if (todo.id === id) {
  //       return {...todo, isDone:!todo.isDone};
  //     } else {
  //       return todo;
  //     }
  //   });

  //   setTodos(updatedTodo);

  //   updatedTodo = updatedTodo.find((todo) => {

  //   })
  // }

  // 削除
  const handleRemove = async (id: number) => {
    const isConfirmed = window.confirm('Todoを削除します');

    if (!isConfirmed) return

    try {
      await fetch(`${API_ENDPOINT}/${id}`, {
        method: "DELETE"
      });
      setTodos((prev) => (
        [
          ...prev.filter((todo) => todo.id !== id)
        ]
      ))
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={props.todoItem.isDone}
        onChange={() => handleToggleIsDone(props.todoItem.id)}
      />
      {selectedTodo?.id !== props.todoItem.id ?
        <>
          <p>{props.todoItem.title}</p>
          <button onClick={() => {
            setSelectedTodo(props.todoItem)
          }}>編集する</button>
          <button onClick={() => handleRemove(props.todoItem.id)}>削除</button>
        </>
        :
        <>
          <input
            type="text"
            value={selectedTodo?.title}
            onChange={(e) => setSelectedTodo(prev => ({
              ...prev!,
              title: e.target.value
            }))}
            disabled={props.todoItem.isDone}
          />
          <button onClick={() => handleEdit(selectedTodo)} >完了</button>
          <button onClick={() => {
            setSelectedTodo(undefined)
          }}>キャンセル</button>
        </>
      }
    </li>
  )
};