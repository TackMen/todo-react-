import axios from 'axios';


type NewTodo = {
  title: string;
  isDone: boolean;
}
type UpdateTodo = {
  isDone: boolean;
}
type EditTodo = {
  title: string;
  isDone: boolean;
}

const getTodos = async () => {
  const res = await axios.get('http://localhost:3001/todos')
  return res.data;
};

const addTodo = async (newTodo:NewTodo) => {
  const res = await axios.post('http://localhost:3001/todos',newTodo);
  return res.data;
}

const editTodo = async (id: number, editedTodo: EditTodo) => {
  const res = await axios.put(`http://localhost:3001/todos/${id}, editedTodo`);
  return res.data;
}

const updateTodo = async (id: number, updatedTodo: UpdateTodo) => {
  const res = await axios.patch(`http://localhost:3001/todos/${id}`,updatedTodo);
  return res.data;
}

const deleteTodo = async (id: number) => {
  const res = await axios.delete(`http://localhost:3001/todos/${id}`);
  return res.data;
}



