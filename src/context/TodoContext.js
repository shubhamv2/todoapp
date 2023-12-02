import { useContext, createContext } from "react";

export const TodoContext = createContext({
    todo:[],
    deleteTodo:()=>{},
    updateTodo:()=>{},
    addTodo:()=>{},
    toggleComplete:()=>{}
});

export const TodoProvider = TodoContext.Provider;
export function  useTodo(){
    return useContext(TodoContext);
}