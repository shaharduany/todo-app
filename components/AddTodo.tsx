import React, { useRef } from "react";
import TodoItem from "../lib/todos/todo-item";

function AddTodo(){
    const todoInputRef = useRef();

    const todoSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(todoInputRef.current.value);
    }

    return (<div>
        <form onSubmit={todoSubmit}>
            <div>
                <label htmlFor="todo">Todo</label>
                <input id="todo" type={"text"} ref={todoInputRef} />
            </div>
            <div>
                <button type="submit">ADD</button>
            </div>
        </form>
    </div>)
}

export default AddTodo;