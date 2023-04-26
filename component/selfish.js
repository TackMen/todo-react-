import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useCallback, useState } from "react";
import { Header } from "@/component/header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [text, setText] = useState("");
  const [array, setArray] = useState([]);

  const handleChange = useCallback((e) => {
    setText(e.target.value.trim());
  }, []);

  const handleAdd = useCallback(() => {
    setArray((prevArray) => {
      return [...prevArray, text];
    });
  }, [text]);

  const deleteTodo = (index) => {
    const newArray = [...array];
    newArray.splice(index, 1);
    setArray(newArray);
  };

  const completeTodo = (index) => {
    const newArray = [...array];
    newArray [index] = `${items[index]}(完了)`;
    setArray(newArray);
  };


  return (
    <>
      <Header />
      <main className={styles.main}>
          <h1 className={styles.title}>Todo</h1>
          <input type="text" value={text} onChange={handleChange} />
          <button onClick={handleAdd}>追加する</button>
          <ul>
            {array.length === 0 ?(<li>現在、Todoがありません</li>):
            <ul>
            {array.map((item) => {
              return <li key={item}>{item}</li>;
            })}

            <button
              onClick={() => {deleteTodo(index)}}
              className= {styles.deleteButton}
            >削除</button>
            <button onClick={() => {completeTodo(index)}}>完了</button>
            </ul>
            }
          </ul>


            {/* <li>現在、Todoがありません</li>
            {array.map((item) => {
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
