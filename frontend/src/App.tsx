
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

      <div className='bg-yellow-300 flex justify-center items-center m-4'><NavbarMenu /></div>
      {/* <div className='bg-green-500 flex flex-row flex-wrap justify-between items-center'><NavbarDashboard /></div> */}
      <div className='bg-green-500 flex justify-center items-center m-4'><NavbarDashboard id="123" /></div>
      <div className='bg-gray-600 flex justify-center items-center m-4'>
        <BioAvatar />
      </div>
      <div className='bg-pink-400'>4</div>
      <div className='flex flex-1'><Outlet /></div>
      <div className='  bg-orange-400'>6</div>
    </div>
  )
}

export default App
