import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import ErrorPage from './pages/error-page/index.tsx'
import Profiles from './pages/profiles-page/index.tsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      { 
        path: "profiles/:content",
        element: <Profiles/>
      }
    ]
  },
  // {
  //   path: '/profiles',
  //   element: <Profiles/>,
  //   errorElement: <ErrorPage/>
  // }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
