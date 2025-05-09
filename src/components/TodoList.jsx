import { MdDeleteOutline } from "react-icons/md";
import { BiMessageSquareEdit } from "react-icons/bi";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { RiCheckboxCircleFill } from "react-icons/ri";


const TodoList = ({todos, handleDelete, handleEdit,handleOnCheck, location}) => {
    const myclass = {
        textAlign: "center",
        fontSize: '.8rem',
        color:"var(--inactivecolor)"
    }

    return (
        <div className="todolist">
            {
                todos.length > 0 ? todos.map(todo => <div key={todo.id} className='todo-item'>

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
                </div>): location ==="/" ?<p style={myclass}>There are no pending task</p>:<p style={myclass}>There are no completed task</p>
            }
        </div>

    )
}

export default TodoList