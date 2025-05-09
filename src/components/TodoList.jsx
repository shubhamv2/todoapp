const TodoList = () => {
    return (
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

    )
}

export default TodoList