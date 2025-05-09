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

  useEffect(()=>{
    const allTodos = JSON.parse(localStorage.getItem('todos'))

    if(allTodos.length > 0){
      setTodos(allTodos)
    }
  },[])

  useEffect(()=>{
    localStorage.setItem('todos',JSON.stringify(todos))
  },[todos])

  const handleOnTodoTextChange = (event) => {
    setTodoText(event.target.value)
  }

  const handleAddButtonClick = () => {
    if(todoText !== "" ){
      setTodos([{ id: uuid(), todo: todoText.trim(), isCompleted: false, isEdit:false}, ...todos])
      setTodoText("")
    }
  }

  const handleOnCheck = (id) => {
    const newtodos = todos.map(todo=> todo.id == id?{...todo, isCompleted: !todo.isCompleted}:todo)
    setTodos(newtodos)
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
    const newTodos = todos.map(todo=> todo.id == id?{...todo, isEdit:!todo.isEdit}:todo)
    setTodos(newTodos)
    console.log(newTodos)

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
