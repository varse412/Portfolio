
import './App.css'
import {Outlet,Link} from 'react-router-dom'
import {dashboardScreenName} from '../src/pages/profiles-page/types.ts'
const dashboardScreens: JSX.Element[] = Object.values(dashboardScreenName).map((screenName, index) => (
  <div key={index}>
    <Link to={`profiles/${screenName}`}>{screenName}</Link>
  </div>
));
function App() {
  return (
   <div id="projectContainer">
     
     <div className='bg-yellow-300'>1</div>
     <div className='bg-green-500'>{dashboardScreens}</div>
     <div className='bg-gray-600'>3</div>
     <div className='bg-pink-400'>4</div>
     <div className='flex flex-1'><Outlet/></div>
     <div className='bg-orange-400'>6</div>
   </div>
  )
}

export default App
