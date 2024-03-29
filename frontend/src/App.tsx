
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
const redstyle="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-56"
function App() {

  return (
    <>
     <h1 className="text-3xl font-normal underline bg-red-800">
      Hello world!
    </h1>
    <div className={redstyle}>
  <div className="shrink-0">
    <img className="h-12 w-12" src={reactLogo} alt="ChitChat Logo"/>
  </div>
  <div>
    <div className="text-xl font-medium text-black">ChitChat</div>
    <p className="text-slate-500">You have a new message!</p>
  </div>
</div>      
<button className="dark:md:hover:bg-fuchsia-600 ">
  Save changes
</button>
    </>
  )
}

export default App
