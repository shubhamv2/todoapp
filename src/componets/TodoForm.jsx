import { useState } from "react";
import { useTodo } from "../context";

function TodoFrom(){
    const {addTodo} = useTodo();
    const [todo, setTodo] = useState("");
    function submitTodo(e){
        e.preventDefault();
        if(!todo) return;
        addTodo({todo,completed:false});
        setTodo("");
    }
    return(
        <form className="w-full flex" onSubmit={submitTodo}>
            <input type="text" className="w-full outline-none px-3 py-3 rounded-l-md border-none bg-[#1e293b] text-xl duration-300" placeholder="Write your todos..." value={todo} onChange={(e)=>setTodo(e.target.value)}/>
            <button className="bg-green-500 px-5 py-3 rounded-r-md font-semibold text-lg" type="submit">Add</button>
        </form>
    )
}
export default TodoFrom;