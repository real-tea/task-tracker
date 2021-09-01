import { useState, useEffect } from 'react';

import Header from './components/header'
import Tasks from './components/tasks'
import AddTask from './components/addTask'


function App() {

  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks,setTasks] = useState([])

  useEffect (()=>{

    const getTask = async() =>{
      const tasksfromServer = await fetchTasks()
      setTasks(tasksfromServer)
    }
    getTask();
  },[])

      const fetchTasks = async() => {
      const res = await fetch("http://localhost:4000/tasks")
      const data = await res.json()
      return data
    }

    const fetchTask = async(id) => {
      const res = await fetch(`http://localhost:4000/tasks/${id}`)
      const data = await res.json()
      return data
    }

    const deleteTask = async(id) =>{
      await fetch(`http://localhost:4000/tasks/${id}`,{
        method : 'DELETE',
      })
     
      setTasks(tasks.filter((task)=>task.id !==id))
     
    }


const ToggleReminder = async (id) =>{
  const taskToToggle = await fetchTask(id)
  const updTask = {...taskToToggle,reminder: !taskToToggle.reminder}

  const res = await fetch(`http://localhost:4000/tasks/${id}`,{
    method : 'PUT', 
    headers : {
      'Content-type':'application/json'
    },
    body : JSON.stringify(updTask),
  })

  const data = await res.json()

  setTasks(tasks.map((task)=> task.id === id ? {...task,reminder : data.reminder}:task))
}


const addTask = async (task) =>{

  const res = await fetch('http://localhost:4000/tasks',{
    method : 'POST', 
    headers: {
      'Content-Type': 'application/json',
    }, 
    body : JSON.stringify(task),
  })

  const data = await res.json()

  setTasks([...tasks,data])
  
  // const id = Math.floor(Math.random()*1000) + 1
  // const newTask = {id,...task}
  // setTasks([...tasks,newTask])
}

const DeleteTask = (id)=>{
    setTasks(tasks.filter((task)=> task.id!==id))
}


  return (
    <div className="App">
    <Header onAdd={()=>setShowAddTask(!showAddTask)} showAdd = {showAddTask} />
    {showAddTask && <AddTask onAdd = {addTask}/>}
    <Tasks tasks = { tasks } onDelete = { deleteTask } onToggle = {ToggleReminder	}/>
    </div>
  );
}

export default App;
