import './App.css'
import { IoAdd } from "react-icons/io5";
import { useState, useEffect, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { NavLink, Routes, Route, useLocation, useNavigate } from 'react-router';
import TodoList from './components/TodoList'; 

function App() {

  const [todoText, setTodoText] = useState("")
  const [todos, setTodos] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [idToUpdate, setIdToUpdate] = useState('')
  const ref = useRef(0)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {

    const allTodos = JSON.parse(localStorage.getItem('todos'))

    if (allTodos.length > 0) {

      setTodos(allTodos)

    }

  }, [])



  useEffect(() => {

    localStorage.setItem('todos', JSON.stringify(todos))

  }, [todos])


  
  const handleOnTodoTextChange = (event) => {

    setTodoText(event.target.value)

  }

  
  
  //Function to add and edit todos
  const handleAddButtonClick = () => {
   
    if (todoText !== "" && isEdit) {

      setTodos([...todos.map(todo => todo.id === idToUpdate ? { ...todo, todo: todoText } : todo)])

      console.log([...todos.map(todo => todo.id === idToUpdate ? { ...todo, todo: todo.todoText } : todo)])

      setIsEdit("")

      setIdToUpdate("")

      setTodoText("")
    }

    else if (todoText !== "") {
      
      setTodos([{ id: uuid(), todo: todoText.trim(), isCompleted: false, isEdit: false }, ...todos])
      
      setTodoText("")
    }

    if(location.pathname !== '/'){
      
      navigate('/')
    
    }
  }

  
  //logic for checkbox
  const handleOnCheck = (id) => {
    
    const newtodos = todos.map(todo => todo.id == id ? { ...todo, isCompleted: !todo.isCompleted } : todo)
    
    setTodos(newtodos)
  
  }

  //logic if we press enter in input tag
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddButtonClick()
    }
  }

  //logic for deleting todos
  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id != id))
  }


  //logic for edit todos
  const handleEdit = (id) => {
    setIsEdit(true)
    setIdToUpdate(id)
    setTodoText(todos.find(item => item.id === id).todo)
    ref.current.focus()
  }

  
  const pendingTask = todos.filter(item=>item.isCompleted !== true)
  
  const completedTask = todos.filter(item=>item.isCompleted === true)


  return (
    <div className='todo-container'>
      <h1 className='todo-heading'>Todo List</h1>
      <div className="todo-add">
        <input ref={ref} onKeyDown={handleKeyDown} type="text" placeholder='Add your todo...' onChange={handleOnTodoTextChange} value={todoText} />
        <button onClick={(e) => handleAddButtonClick(e)}><IoAdd /></button>
      </div>

      <div className="navigator">
        <NavLink to='/' className="pending-todo">
          Pending Task({todos.filter(item=>item.isCompleted !== true).length})
        </NavLink>
        <NavLink to="/completed" className="completed-todo">
          Completed Tasks({todos.filter(item=>item.isCompleted === true).length})
        </NavLink>
      </div>

      {/* todo list */}

      <Routes>
        <Route index path='/'
        element={<TodoList todos={pendingTask} handleOnCheck={handleOnCheck} handleDelete={handleDelete} handleEdit={handleEdit} location={location.pathname}/>}
        />
        <Route index path='completed'
        element={<TodoList todos={completedTask} handleOnCheck={handleOnCheck} handleDelete={handleDelete} handleEdit={handleEdit} location={location.pathname}/>}
        />
      </Routes>
      
      
    </div>
  )
}

export default App
