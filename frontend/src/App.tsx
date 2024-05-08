
import './App.css'
import { Outlet, Link } from 'react-router-dom'
import { dashboardScreenName } from '../src/pages/profiles-page/types.ts'
import { NavbarDashboard, NavbarMenu, BioAvatar } from './components/nav-bar-dashboard/index.tsx';
import { Menu } from 'lucide-react'

const dashboardScreens: JSX.Element[] = Object.values(dashboardScreenName).map((screenName, index) => {

  return (
    <>
      {(index != Object.values(dashboardScreenName).length - 1) ? (<div key={index} className='flex flex-1 m-2'>
        <Link to={`profiles/${screenName}`}>{screenName}</Link>
      </div>) : null}
    </>
  )

});

function App() {
  return (
    <div id="projectContainer">

      <div className='g-yellow-300 flex justify-center items-center p-2'><NavbarMenu /></div>
      {/* <div className='bg-green-500 flex flex-row flex-wrap justify-between items-center'><NavbarDashboard /></div> */}
      <div className='g-green-500 flex justify-center items-center p-2'><NavbarDashboard /></div>
      <div className='g-gray-600 justify-center items-center p-2'>
        <BioAvatar />
      </div>
      <div className='g-pink-400 p-2' />
      <div className='p-2'><Outlet /></div>
      <div className=' g-orange-400 p-2' />
    </div>
  )
}

export default App
