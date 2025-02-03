import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Swal from "sweetalert2";
import { Tooltip } from 'react-tooltip';
import './App.css';
import plus from './assets/plus.svg';
import edit from './assets/edit.svg';
import del from './assets/delete.svg';
import Navbar from './components/Navbar';

function App() {
  const input_ref = useRef(null);
  const [task, setTask] = useState("");
  const [inp, setInp] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);


  useEffect(() => {
    const alltasks = localStorage.getItem("Tasks");
    if (alltasks) {
      try {
        const tasks = JSON.parse(alltasks);
        setInp(tasks);
      } catch (error) {
        console.error("Error parsing tasks from localStorage:", error);
      }
    }
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem("Tasks", JSON.stringify(inp));
      console.log("Tasks saved to localStorage:", inp);
    }
  }, [inp, hasLoaded]);

  const handleadd = () => {
    if (task.trim() === "") {
      alert('Please enter a Valid Task!');
      return;
    }
    const newTask = { id: uuidv4(), task, isDone: false };
    setInp(prevInp => [...prevInp, newTask]);
    setTask("");
    input_ref.current.focus();
  };

  const handleenter = (e) => {
    if (e.key === "Enter") {
      handleadd();
    }
  };

  const handleedit = (id) => {
    const filtered = inp.find((e) => e.id === id);
    setTask(filtered.task);
    let newinp = inp.filter((e) => e.id !== id)
    setInp(newinp)
  };

  const handledelete = (id) => {
    Swal.fire({
      title: "Taskify says",
      text: "Are you sure you want to delete this task?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      background: "transparent",
      color: "white",
      cancelButtonColor: "#3085d6",
      border: "white",
    }).then((result) => {
      if (result.isConfirmed) {
        let newinp = inp.filter((e) => e.id !== id)
        setInp(newinp)
        Swal.fire({
          title: "Deleted!",
          text: "Your task has been deleted.",
          icon: "success",
          background: "transparent",
          color: "#fff",
        });
      }
    });
  };

  const handlechange = (e) => {
    setTask(e.target.value);
  };

  const handleCheck = (e) => {
    const id = e.target.name;
    setInp((prevInp) =>
      prevInp.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    );
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
            <button data-tooltip-id="add-tooltip" onClick={handleadd}>
              <img src={plus} alt="plus" className='h-8 cursor-pointer hover:scale-110 transition-all' />
            </button>
            <Tooltip id="add-tooltip" place="top" content="Add the task" />
          </div>
        </div>
        <div className="list rounded border-blue-400 w-1/2 m-auto h-8/9 my-5">
          <h1>Tasks to do:</h1>
          <br />
          <div className="task flex flex-col gap-2 p-5 w-7/8 m-auto rounded-xl bg-[rgb(21,16,28)]">
            {inp.length === 0 && <div className='text-center'>No Tasks!</div>}
            {inp.map((e) => (
              <div key={e.id} className="flex items-center justify-between my-2">
                <div className={e.isDone ? "line-through" : ""}>
                  {e.task}
                </div>
                <div className="btn flex items-center gap-4">
                  <label data-tooltip-id="done-tooltip" className="relative cursor-pointer">
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
                  <Tooltip id="done-tooltip" place="top" content="Mark as Done" />

                  <button data-tooltip-id="edit-tooltip" onClick={() => handleedit(e.id)}>
                    <img src={edit} alt="edit" className='h-7 cursor-pointer hover:scale-110 transition-all' />
                  </button>
                  <Tooltip id="edit-tooltip" place="top" content="Edit Task" />
                  <button data-tooltip-id="delete-tooltip" onClick={() => handledelete(e.id)}>
                    <img src={del} alt="del" className='h-7 cursor-pointer hover:scale-110 transition-all' />
                  </button>
                  <Tooltip id="delete-tooltip" place="top" content="Delete Task" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;