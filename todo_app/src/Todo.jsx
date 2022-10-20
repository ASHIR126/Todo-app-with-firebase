import React from 'react'
import { FaRegTrashAlt } from 'react-icons/fa';

const style = {
    li: `flex justify-between bg-slate-300 p-4 my-2 capitalize`,
    liComplete: `justify-between bg-slate-500 p-4 my-2 capitalize `,
    row: ` flex`,
    text: `ml-2 cursor-pointer `,
    textCompleted: `cursor-pointer ml-2 line-through`,
    btn: `cursor-pointer flex items-center`,
}
const Todo = ({ todo, toggleComplete, deleteTodo }) => {
    return (
        <li className={todo.complete ? style.liComplete : style.li}>
            <div className={style.row}>
                <input onChange={() => toggleComplete(todo)} type="checkbox" checked={todo.complete ? 'checked' : ''} />
                <p onChange={() => toggleComplete(todo)} className={todo.complete ? style.textCompleted : style.text}>{todo.text}</p>
            </div>
            <button className={style.btn} onClick={() => deleteTodo(todo.id)}><FaRegTrashAlt /></button>
        </li >
    )
}

export default Todo