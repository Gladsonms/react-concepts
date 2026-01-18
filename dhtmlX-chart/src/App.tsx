import GanttChart from './ganttChart/GanttChart';
import './App.css';

function App() {
  return (
    <div className="app">
      <GanttChart numberOfProjects={1000} numberOfTasksPerProject={40} />
    </div>
  );
}

export default App;
