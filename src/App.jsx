import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ChatPage from './components/ChatPage'
import Home from './components/Home'
import Login from './components/Login'
import MainLayout from './components/MainLayout'
import ProtectedRoutes from './components/ProtectedRoutes'
import Signup from './components/Signup'
import Profile from './components/Profile'
import EditProfile from './components/EditProfile'


const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes> <MainLayout /> </ProtectedRoutes> ,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/profile/:id',
        element: <Profile />
      },
      {
        path: '/account/edit',
        element: <EditProfile />
      }, 
      {
        path: '/chat',
        element: <ChatPage />
      }, 
      
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
])

function App() {

  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  )
}

export default App
