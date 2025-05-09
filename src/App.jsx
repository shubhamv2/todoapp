import './App.css'
import { IoAdd } from "react-icons/io5";
import { useState, useEffect, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { MdDeleteOutline } from "react-icons/md";
import { BiMessageSquareEdit } from "react-icons/bi";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { NavLink } from 'react-router';


function App() {

  const [todoText, setTodoText] = useState("")
  const [todos, setTodos] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [idToUpdate, setIdToUpdate] = useState('')
  const ref = useRef(0)


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
  }

  const handleOnCheck = (id) => {
    const newtodos = todos.map(todo => todo.id == id ? { ...todo, isCompleted: !todo.isCompleted } : todo)
    setTodos(newtodos)
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddButtonClick()
    }
  }

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id != id))
  }
  const handleEdit = (id) => {
    setIsEdit(true)
    setIdToUpdate(id)
    setTodoText(todos.find(item => item.id === id).todo)
    ref.current.focus()
  }

  return (
    <div className='todo-container'>
      <h1 className='todo-heading'>Todo List</h1>
      <div className="todo-add">
        <input ref={ref} onKeyDown={handleKeyDown} type="text" placeholder='Add your todo...' onChange={handleOnTodoTextChange} value={todoText} />
        <button onClick={(e) => handleAddButtonClick(e)}><IoAdd /></button>
      </div>

      <div className="navigator">
        <NavLink to='/' className="all-todo">
          All Tasks({todos.length})
        </NavLink>
        <NavLink to="/completed" className="completed-todo">
          Completed Tasks({todos.length})
        </NavLink>
        <NavLink to="/deleted" className="all-todo">
          Deleted Tasks({todos.length})
        </NavLink>
      </div>

      {/* todo list */}
      <div className="todolist">
        {
          todos.map(todo => <div key={todo.id} className='todo-item'>

            <div className="checkbox-item">

              <div className="checkbox">
                <button onKeyDown={(event) => handleKeyDown(event)} onClick={() => handleOnCheck(todo.id)} className={`btn ${todo.isCompleted ? "checked" : "unchecked"}`}>{
                  !todo.isCompleted ? <RiCheckboxCircleLine /> :
                    <RiCheckboxCircleFill />
                }
                </button>
              </div>

              <p className="todo-content" style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>
                {todo.todo}
              </p>
            </div>
            <div className="todo-buttons">
              <button onClick={() => handleEdit(todo.id)} className='btn btn-edit'>
                <BiMessageSquareEdit />
              </button>
              <button onClick={() => handleDelete(todo.id)} className='btn btn-del'>
                <MdDeleteOutline />
              </button>
            </div>
          </div>)
        }
      </div>
    </div>
  )
}

export default App
