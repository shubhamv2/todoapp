import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTodo } from '../context';
import { useState } from 'react';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
function TodoItems({todo,focusRef}){
    const {deleteTodo, updateTodo, toggleComplete} = useTodo();
    const deleteItem=()=>{
        deleteTodo(todo.id);
    }
    const updateItem = () =>{
        updateTodo(todo.id,{todo:updatedTodo,...todo});
        setIsEditable(false);
    }
    const updateToggle = () =>{
        toggleComplete(todo.id);
    }
    const [updatedTodo, setUpdatedTodo] = useState(todo.todo);
    const [isEditable, setIsEditable] = useState(false);
    return(
        <div className=
        {`${todo.completed?
            "bg-[#4ade80]" : "bg-[#e879f9]"} flex mb-3  rounded-sm p-3 gap-3 items-center duration-300`
            }
            >
            <label htmlFor={`id-${todo.id}`} className={`cursor-pointer duration-300 w-4 p-2 relative h-4 border-4 rounded-full ${todo.completed?"border-white bg-green-500":""}`}></label>
            <input 
            type="checkbox" id={`id-${todo.id}`} 
            className='hidden' 
            checked={todo.completed} 
            onChange={updateToggle}/>
            <input 
            type="text" id={`field-${todo.id}`}
            className={`px-2 text-lg bg-transparent outline-none w-full cursor-default  ${todo.completed?"line-through":""} ${isEditable?"border border-white/10 shadow-inner":""}`} 
            value={updatedTodo} 
            onChange={(e)=>setUpdatedTodo(e.target.value)} 
            readOnly={!isEditable}
            ref={focusRef}/>
            <button 
            className='text-green-500 bg-[#e4e4e7] py-1 px-1.5 rounded-full'  
            onClick={()=>{
                focusRef.current.focus();
                if(todo.completed) return;
                if(updatedTodo){
                    if(isEditable){
                        updateItem();
                    }
                    else setIsEditable((prev) => !prev);
                }
                else{
                    return
                }
            }} disabled={todo.completed || !updateTodo} >
                {isEditable?<DoneOutlineIcon/>:<EditIcon/>}</button>
            <button 
            className='text-red-600 bg-[#e4e4e7] py-1 px-1.5 rounded-full' 
            onClick={deleteItem}>
                <DeleteIcon/>
            </button>
        </div>
    )
}
export default TodoItems;