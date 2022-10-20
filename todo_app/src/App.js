import { collection, onSnapshot, query, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase'
import { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai'
import './index.css';
import Todo from './Todo';

const style = {

  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[700px]	 w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  btn: `   border p-4 ml-2  bg-purple-500 text-slate-100 `,
  count: `text-center p-4 mt-2`
}

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');


  const createTodo = async (e) => {
    e.preventDefault();
    if (input == '') {
      alert('Please enter valid Todo')
    };
    await addDoc(collection(db, 'todos'), {
      text: input,
    })
    setInput('')
  }



  useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
      console.log(todosArr)
    });
    return () => unsubscribe();
  }, []);


  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      complete: !todo.complete
    })
  }

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id))
  }

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo</h3>
        <form className={style.form} onSubmit={createTodo} >
          <input value={input} onSubmit={createTodo} onChange={(e) => setInput(e.target.value)} type="text" placeholder='Enter Todo' className={style.input} />
          <button className={style.btn}><AiOutlinePlus size={30} /> </button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Todo todo={todo}
              key={index}

              //Getting from child component
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />

          ))}
        </ul>
        {todos.length == 0 ? null : <p className={style.count}>{`You have ${todos.length} Todo's`}</p>}

      </div>
    </div>
  );
}

export default App;
