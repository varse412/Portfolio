import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import ErrorPage from './pages/error-page/index.tsx'
import Profiles from './pages/profiles-page/index.tsx'
// import EditProject from './pages/projects-page/editProject.tsx'
import EditContent from './pages/content-edit/index.tsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      { 
        path: "profiles/:profile",
        element: <Profiles/>,
        errorElement: <ErrorPage/>,
        children: [
          {
             path: ":id",
             element: <EditContent/>,
             errorElement: <ErrorPage/>
          }
        ]
      },
     
    ]
  },
  
  // EditContent

])
{/* <EditProject/> */}
 // {
      //        path: "profiles/:profile/:id",
      //        element: <h1>Helo world</h1>,
      //        errorElement: <ErrorPage/>,
      // }
// {
  //   path: 'profiles/projects/:projectId',
  //   element: <App/>,
  //   errorElement: <ErrorPage/>,
  //   children: [
  //     { 
  //       path: "profiles/:profile",
  //       element: <Profiles/>
  //     }
  //   ]
  // },
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
