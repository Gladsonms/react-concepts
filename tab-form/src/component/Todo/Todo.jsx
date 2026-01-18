import { useState } from "react"

const Todo = () =>{

const [todo,setTodo]=useState("")
const [todoList,setTodoList]=useState([])

const onChangeTodo = (e) =>{
setTodo(e.target.value)
}

const handleAddTodo = () =>{
    let todoObj={
        id:Date.now(),
        todoValue:todo.trim()
    }
    setTodoList((prevState)=>[...prevState,todoObj])

}


console.log(todoList)
    return(
        <>
        <h1>todo</h1>

        <div>
            <div>
                <input  type="text"  value={todo}   onChange={(e) => onChangeTodo(e)}/>
                  <button  onClick={handleAddTodo}>Add</button>
            </div>
        </div>
        </>
    )
}


export default Todo