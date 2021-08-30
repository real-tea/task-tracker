import { useState } from 'react';

import Header from './components/header'
import Tasks from './components/tasks'
import AddTask from './components/addTask'


function App() {
const [tasks,setTasks] = useState([
  { 
    id : 1,
    text : 'Coding',
    reminder : true,
    day:'tuesday'
  },
  { id:2, 
    text : 'Relaxing',
    reminder : true,
    day:'monday'
  },
  { id:3, 
    text:'Playing', 
    reminder : false,
    day:'tuesday'}
])


const ToggleReminder = (id) =>{
  setTasks(tasks.map((task)=> task.id === id ? {...task,reminder : !task.reminder}:task))
}


const addTask = (task) =>{
  console.log(task)
}

const DeleteTask = (id)=>{
    setTasks(tasks.filter((task)=> task.id!==id))
}


  return (
    <div className="App">
    <Header />
    <AddTask onAdd = {addTask}/>
    <Tasks tasks = { tasks } onDelete = { DeleteTask } onToggle = {ToggleReminder	}/>
    </div>
  );
}

export default App;
