import { useState, useEffect } from 'react';
import axios from 'axios';
import Todo from './Todo';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('../pages/api/todos');
      setTodos(response.data);
    };

    fetchData();
  }, []);

  const handleAddTodo = async () => {
    const newTodo = { title: 'New Todo', isDone: false };
    const response = await axios.post('../pages/api/todos', newTodo);
    setTodos([...todos, response.data]);
  };

  return (
    <div>
      <button onClick={handleAddTodo}>Add Todo</button>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;