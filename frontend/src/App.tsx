
import './App.css'
import ProjectForm from './components/project-section-form/index.tsx'
import {Outlet,Link} from 'react-router-dom'
function App() {

  return (
    
    // <div style={{display: "flex" }} className='bg-slate-500 container mx-auto'>
    // <div className='bg-green-400 '>
    //   <h1 className='text-center text-4xl font-bold text-white'>Projects</h1>
    //   <div className='card'>
    //     <ProjectForm/>
    //   </div>
    // </div>
    // <ProjectForm/>
    
    
   <div id="projectContainer">
     <Link to={`profiles/1`}>Hello world open form</Link>
     <Link to={`profiles/2`}>open box</Link>
   <Outlet/>
    
   </div>
  
  )
}

export default App
