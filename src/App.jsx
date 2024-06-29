import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'  
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'))
    if(todos) {
      settodos(todos)
    }
  }, [])

  const saveToLS = (params) => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
    saveToLS()
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i=>i.id === id);
    settodo(t[0].todo);
    saveToLS();

    let newTodos = todos.filter(item => { return item.id !== id }); 
    settodos(newTodos);
    saveToLS();
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => { return item.id !== id }); 
    settodos(newTodos);
    saveToLS();
  }

  const handleAdd = () => {
    if(todo.length > 3){
      settodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
      settodo("");
      saveToLS();
    }
  }

  const handleChange = (e) => {
    settodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => { return item.id === id })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos)
    saveToLS();
  }

  return (
    <>
    < Navbar />
    <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-blue-200 min-h-[80vh]">
      <h1 className='font-bold text-2xl'>ShoobDo - Manage Your Tasks at one place UWU</h1>
      <div className="addtodo my-5 flex flex-col gap-3"> 
        <h2 className='text-xl font-bold'>Add a todo</h2>
        <div className="flex">
        <input  onChange={handleChange} value={todo} type="text" className='w-1/2 px-5 rounded-lg py-1'/>
        <button onClick={handleAdd} disabled={todo.length < 4} className="bg-blue-500 hover:bg-blue-800 disabled:bg-red-600 active:bg-green-950 p-3 py-1 text-base font-bold text-white rounded-md mx-3">Add</button>
        </div>
      </div>
       {/* <input type="checkbox" onChange={toggleFinished} checked={showFinished} className="m-3"/> Show Finished */}
        <input className='my-4' onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
        <h2 className='text-lg font-bold'>Your ToDos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5 text-lg font-mono">No todos yet</div>  }
          {todos.map(item => {

          return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex md:w-1/3 my-3 justify-between">
            <div className="flex gap-5">
            <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id=''/>
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>{handleEdit(e, item.id)}} className="bg-blue-600 hover:bg-blue-800 p-3 py-1 text-sm font-bold active:bg-blue-950 text-white rounded-md mx-2"><FaEdit /></button>
              <button onClick={(e)=>{handleDelete(e, item.id)}} className="bg-blue-600 hover:bg-blue-800 p-3 py-1 text-sm font-bold active:bg-blue-950 text-white rounded-md mx-2"><MdDeleteForever /></button> 
            </div>
          </div>
          })}
        </div>
    </div>
    </>
  )
}

export default App
