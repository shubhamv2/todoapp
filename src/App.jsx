import './App.css'
import { IoAdd } from "react-icons/io5";
import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { MdDeleteOutline } from "react-icons/md";
import { BiMessageSquareEdit } from "react-icons/bi";

import { RiCheckboxCircleLine } from "react-icons/ri";

import { RiCheckboxCircleFill } from "react-icons/ri";




function App() {
  const [todoText, setTodoText] = useState("")
  const [todos, setTodos] = useState([])

  const handleOnTodoTextChange = (event) => {
    setTodoText(event.target.value)
  }

  const handleAddButtonClick = () => {

    if(todoText !== ""){
      setTodos([{ id: uuid(), todo: todoText.trim(), isCompleted: false }, ...todos])
      setTodoText("")
    }
  }

  const handleOnCheck = (id) => {
    const item = todos.find(todo => todo.id == id)
    setTodos([{ ...item, isCompleted: !item.isCompleted }, ...todos.filter(todo => todo.id != id)])
  }

  const handleKeyDown = (event) => {
    if(event.key === "Enter"){
      handleAddButtonClick()
    }
  }

  const handleDelete = (id) =>{
    setTodos(todos.filter(todo=> todo.id != id))
  }
  const handleEdit = (id) =>{
    setTodoText(todos.find(todo=>todo.id === id).todo)
    setTodos(todos.filter(todo=>todo.id !== id))

  }

  return (
    <div className='todo-container'>
      <h1 className='todo-heading'>Todo List</h1>
      <div className="todo-add">
        <input onKeyDown={handleKeyDown} type="text" placeholder='Add your todo...' onChange={handleOnTodoTextChange} value={todoText} />
        <button onClick={(e) => handleAddButtonClick(e)}><IoAdd /></button>
      </div>


      {/* todo list */}
      <div className="todolist">
        {
          todos.map(todo => <div key={todo.id} className='todo-item'>

            <div className="checkbox-item">

              <div className="checkbox">
                <button onKeyDown={(event)=>handleKeyDown(event)} onClick={() => handleOnCheck(todo.id)} className={`btn ${todo.isCompleted ? "checked" : "unchecked"}`}>{
                  !todo.isCompleted ? <RiCheckboxCircleLine /> :
                    <RiCheckboxCircleFill />
                }
                </button>
              </div>

              <div className="todo-content" style={{textDecoration: todo.isCompleted?"line-through":""}}>
                {todo.todo}
              </div>
            </div>
            <div className="todo-buttons">
              <button onClick={()=>handleEdit(todo.id)} className='btn btn-edit'>
                <BiMessageSquareEdit />
              </button>
              <button  onClick={()=>handleDelete(todo.id)} className='btn btn-del'>
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
