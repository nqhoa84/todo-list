import logo from './logo.svg';
import './App.css';
import { useEffect, useState} from 'react';
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);
  
  useEffect(() =>{
    console.log('this is called once refresh page. ')
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if(storedTodos.length > 0){
      setTodos(storedTodos);
    }
  }, []); // this is called once refresh page. 

  useEffect(() =>{
    console.log('this is called once todos changed.')
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]); // this is called once todos changed.


  function addTodo(text) {
    setTodos([...todos, text]);
  }

  function removeTodo(index) {
    setTodos(todos.filter((todo, i) => i !== index));
  }

  function editTodo(index, text) {
    const newTodos = [...todos];
    newTodos[index] = text;
    setTodos(newTodos);
  }

  return (
    <div className="App">
      <h1>Todo list</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          addTodo(event.target.elements.todo.value);
          event.target.elements.todo.value = '';
        }

        }
      >

        <input type='text' name='todo'></input>
        <button type='submit'>Add todo</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <input type='text' value={todo} onChange={(event)=> editTodo(index, event.target.value)}></input>
            
            <button onClick={() => removeTodo(index)}>Remove</button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;
