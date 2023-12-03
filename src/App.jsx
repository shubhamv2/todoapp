import { TodoFrom, TodoItems } from "./componets";
import { TodoProvider } from "./context";
import { useState, useEffect,useRef } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const addTodo = (todo) =>{
    setTodos((prev)=> [{id:Date.now(), ...todo},...prev]);
  }
  const focusRef = useRef(null);
  const updateTodo = (id, todo) =>{
    setTodos((prev)=>prev.map((prevTodo)=>(prevTodo.id===id?todo:prevTodo)));
  }

  const deleteTodo = (id) =>{
    setTodos((prev)=>prev.filter((prevTodo)=>prevTodo.id !== id));
  }

  const toggleComplete = (id) =>{
    setTodos((prev)=>prev.map((prevTodo)=>prevTodo.id === id?{...prevTodo,completed:!prevTodo.completed}:prevTodo));
  }

  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem("todos"));
    if(todos && todos.length > 0){
      setTodos(todos);
    }    
  },[])
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos));
  },[todos]);
  return (
    <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo, toggleComplete}}>
      <div className="bg-[#172554] w-full min-h-screen">
        <div className="text-white w-full max-w-2xl mx-auto rounded-lg shadow-md py-3 px-2">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="w-full b-4">
            <TodoFrom />
          </div>
          <div className="my-3">
            {
              todos.map((todo)=>(
                <div key={todo.id} className="w-full">
                  <TodoItems todo={todo} focusRef={focusRef}/>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}
export default App;