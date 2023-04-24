import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";
import { FormEvent, useCallback, useState } from "react";
import React from "react";
import { Header } from "../component/header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  type Todo = {
    id: number,
    title: string,
    isDone: boolean,
  };


  const handleChange = useCallback((e: { target: { value: string; }; }) => {
    setTitle(e.target.value.trim());
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo: Todo = {
      id: title.length,
      title: title,
      isDone: false,
    };

    setTodos([newTodo, ...todos]);
    setTitle("");
  };

  const handleEdit = (id: number, title: string) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === id) {
        todo.title = title;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleChecked = (id: number, isDone: boolean) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === id) {
        todo.isDone = isDone;
      }
      return todo;
    });
    setTodos(newTodos);
  }

  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }



  // const handleAdd = useCallback(() => {
  //   setTodos((prevTodos) => {
  //     return [...prevTodos, title];
  //   });
  // }, [title]);

  // const handleDelet = (index) => {
  //   const newTodos = [...Todos];
  //   newTodos.splice(index, 1);
  //   setTodos(newTodos);
  // };

  // const completeTodo = (index) => {
  //   const newTodos = [...Todos];
  //   newTodos[index] = `${items[index]}(完了)`;
  //   setTodos(newTodos);
  // };



  return (
    <>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Todo</h1>
        <form onSubmit={(e) => { handleSubmit(e) }}>
          <input
            type="text"
            onChange={(e) => handleChange(e)} />
          <input type="submit" value="追加する"></input>
        </form>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="text"
                value = {todo.title} 
                onChange={ (e) => handleEdit(todo.id, e.target.value)}
                disabled = {todo.isDone}
                />
              <input
                type="checkbox"
                onChange={ (e) => handleChecked(todo.id, todo.isDone)}
                />
                <button onClick={() => handleDelete(todo.id)}>削除</button>
            </li>
          ))}
        </ul>



{/* 
        <ul>
          {Todos.length === 0 ? (<li>現在、Todoがありません</li>) :
            <ul>
              {Todos.map((item) => {
                return <li key={item}>{item}</li>;
              })}
              <button
                onClick={() => { hundleDelete(index) }}
                className={styles.deleteButton}
              >削除</button>
              <button onClick={() => { completeTodo(index) }}>完了</button>
            </ul>
          }
        </ul> */}


        {/* <li>現在、Todoがありません</li>
            {Todos.map((item) => {
              return <li key={item}>{item}</li>;
            })} */}
        {/* <button
              onClick={() => {deleteTodo(index)}}
              className= {styles.deleteButton}
            >削除</button>
            <button onClick={() => {completeTodo(index)}}>完了</button> */}
        <p></p>
      </main>
    </>
  );
}
