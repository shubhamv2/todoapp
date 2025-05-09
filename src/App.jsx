import './App.css'
import { IoAdd } from "react-icons/io5";


function App() {

  return (
    <div className='todo-container'>
      <h1 className='todo-heading'>Todo List</h1>
      <div className="todo-add">
        <input type="text" placeholder='Add your todo...'/>
        <button><IoAdd/></button>
      </div>
    </div>
  )
}

export default App
