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
  const [datetime, setDateTime] = useState("")

  useEffect(() => {

    const allTodos = JSON.parse(localStorage.getItem('todos'))

    if (allTodos.length > 0) {

      setTodos(allTodos)

    }

    const interval = setInterval(() => {
      const date = new Date()
      const current_date = date.toLocaleDateString()
      const current_time = date.toLocaleTimeString()
      setDateTime(`Date: ${current_date} - Time: ${current_time}`)
    }, 1000);

    return ()=>{
      clearInterval(interval)
    }

  }, [])




  useEffect(() => {

    localStorage.setItem('todos', JSON.stringify(todos))

  }, [todos])



  const handleOnTodoTextChange = (event) => {

    setTodoText(event.target.value)

  }



  //Function to add and edit todos
  const handleAddButtonClick = (e) => {
    e.preventDefault()
    if (todoText !== "" && isEdit) {

      setTodos([...todos.map(todo => todo.id === idToUpdate ? { ...todo, todo: todoText } : todo)])

      setIsEdit("")

      setIdToUpdate("")

      setTodoText("")
    }

    else if (todoText !== "") {

      setTodos([{ id: uuid(), todo: todoText.trim(), isCompleted: false, isEdit: false }, ...todos])

      setTodoText("")
    }

    if (location.pathname !== '/' && isEdit !== true) {

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


  const pendingTask = todos.filter(item => item.isCompleted !== true)

  const completedTask = todos.filter(item => item.isCompleted === true)

  const dateTimeStyle = {
    fontSize: ".8rem",
    textAlign: "center",
    marginTop:"1rem",
    color:" #566573"
  }

  return (
    <div className='todo-container'>
      <h1 className='todo-heading'>Todo List</h1>
      <h1 style={dateTimeStyle}>{datetime}</h1>
      <form className="todo-add" onSubmit={handleAddButtonClick}>
        <input ref={ref} onKeyDown={handleKeyDown} type="text" placeholder='Add your todo...' onChange={handleOnTodoTextChange} value={todoText} />
        <button type='submit'><IoAdd /></button>
      </form>

      <div className="navigator">
        <NavLink to='/' className="pending-todo">
          Pending Task({todos.filter(item => item.isCompleted !== true).length})
        </NavLink>
        <NavLink to="/completed" className="completed-todo">
          Completed Tasks({todos.filter(item => item.isCompleted === true).length})
        </NavLink>
      </div>

      {/* todo list */}

      <Routes>
        <Route index path='/'
          element={<TodoList todos={pendingTask} handleOnCheck={handleOnCheck} handleDelete={handleDelete} handleEdit={handleEdit} location={location.pathname} />}
        />
        <Route index path='completed'
          element={<TodoList todos={completedTask} handleOnCheck={handleOnCheck} handleDelete={handleDelete} handleEdit={handleEdit} location={location.pathname} />}
        />
      </Routes>


    </div>
  )
}

export default App
