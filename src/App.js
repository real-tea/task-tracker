import { useState } from 'react';

import Header from './components/header'
import Tasks from './components/tasks'

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
  }
])

  return (
    <div className="App">
    <Header />
    <Tasks tasks = { tasks }/>
    </div>
  );
}

export default App;
