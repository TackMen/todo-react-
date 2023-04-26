import { useState } from 'react';
import axios from
 

'axios';

const Todo = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const handleEdit = async () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    await axios.put(`/api/todos/${todo.id}`, { title });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await axios.delete(`/api/todos/${todo.id}`);
  };

  const handleCheckboxChange = async (event) => {
    const isDone = event.target.checked;
    await axios.patch(`/api/todos/${todo.id}`, { isDone });
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <div>
      
        <div>
          <input type="text" value={title} onChange={handleTitleChange} />
          <button onClick={handleSave}>Save</button>
        </div>
     
        <div>
          <input type="checkbox" checked={todo.isDone} onChange={handleCheckboxChange} />
          <span>{todo.title}</span>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      
    </div>
  );
};

export default Todo;
