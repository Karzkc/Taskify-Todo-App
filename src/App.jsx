import { useState, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import plus from './assets/plus.svg';
import edit from './assets/edit.svg';
import del from './assets/delete.svg';
import Navbar from './components/Navbar'

function App() {
  const input_ref = useRef(null)
  const [task, setTask] = useState("")
  const [inp, setInp] = useState([])


  const handleadd = () => {
    if (task.trim() === "") {
      alert('Please enter a Valid Task!')
      return;
    }
    setInp([...inp, { id: uuidv4(), task, isDone: false }]);
    setTask("");
    input_ref.current.focus()
    console.log(inp);



  };
  const handleenter = (e) => {
    if (e.key == "Enter") {
      handleadd()
    }
  }
  const handleedit = () => {
    // Edit logic here
  };

  const handledelete = () => {
    // Delete logic here
  };

  const handlechange = (e) => {
    setTask(e.target.value);
  };
  const handleCheck = (e) => {
    const id = e.target.name;
    setInp(prevInp => prevInp.map(item =>
      item.id === id ? { ...item, isDone: !item.isDone } : item
    ));

  };


  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 border rounded border-blue-400 min-h-[150vh]">
        <div className="gap-5 w-full p-3 flex items-center justify-center">
          <div className='w-1/2 px-2 bg-[rgb(21,16,28)] rounded-b-xl flex items-center justify-between'>
            <input
              type="text"
              ref={input_ref}
              onChange={handlechange}
              onKeyDown={handleenter}
              value={task}
              name='task'
              placeholder='Add a Task...'
              className='input w-full outline-none border-blue-400 text-blue-200 font-arial p-2'
            />
            <button onClick={handleadd}>
              <img src={plus} alt="plus" className='h-8 cursor-pointer hover:scale-110 transition-all' />
            </button>
          </div>
        </div>
        <div className="list rounded border-blue-400 w-1/2 m-auto h-8/9 my-5">
          <h1>Tasks to do:</h1>
          <br />
          <div className="task flex flex-col gap-2 p-5 w-7/8 m-auto rounded-xl bg-[rgb(21,16,28)]">
            {inp.map((e, index) => (
              <div key={index} className="flex items-center justify-between my-2">
                <div className={e.isDone ? "line-through" : ""}>
                  {e.task}
                </div>
                <div className="btn flex items-center gap-4">
                  <label className="relative cursor-pointer">
                    <input
                      type="checkbox"
                      checked={e.isDone}
                      name={e.id}
                      className="peer hidden"
                      onChange={handleCheck}
                    />
                    <div className="w-5 h-5 border-2 border-purple-500 rounded-md 
                         peer-checked:bg-purple-500 peer-checked:border-purple-700 
                          flex items-center justify-center">
                      <svg className="hidden peer-checked:block w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L7 13.586 4.707 11.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l9-9a1 1 0 000-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </label>

                  <button onClick={handleedit}>
                    <img src={edit} alt="edit" className='h-7 cursor-pointer hover:scale-110 transition-all' />
                  </button>
                  <button onClick={handledelete}>
                    <img src={del} alt="del" className='h-7 cursor-pointer hover:scale-110 transition-all' />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App
