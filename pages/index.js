import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useCallback, useState } from "react";
import { Header } from "@/component/header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [text, setText] = useState("");
  const [Todos, setTodos] = useState([]);

  const handleChange = useCallback((e) => {
    setText(e.target.value.trim());
  }, []);

  const handleAdd = useCallback(() => {
    setTodos((prevTodos) => {
      return [...prevTodos, text];
    });
  }, [text]);

  const hundleDelete = (index) => {
    const newTodos = [...Todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const completeTodo = (index) => {
    const newTodos = [...Todos];
    newTodos [index] = `${items[index]}(完了)`;
    setTodos(newTodos);
  };


  return (
    <>
      <Header />
      <main className={styles.main}>
          <h1 className={styles.title}>Todo</h1>
          <input type="text" value={text} onChange={handleChange} />
          <button onClick={handleAdd}>追加する</button>
          <ul>
            {Todos.length === 0 ?(<li>現在、Todoがありません</li>):
            <ul>
            {Todos.map((item) => {
              return <li key={item}>{item}</li>;
            })}
            <button
              onClick={() => {hundleDelete(index)}}
              className= {styles.deleteButton}
            >削除</button>
            <button onClick={() => {completeTodo(index)}}>完了</button>
            </ul>
            }
          </ul>


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
