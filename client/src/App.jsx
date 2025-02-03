
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Sidebar from './pages/Sidebar'
import ProtectedRoute from './pages/ProtectedRoute';



function App() {

  

  const router = createBrowserRouter([

    {
      path : "/",
      element: <Signin />
    },
    {
      path : "/signin",
      element: <Signin />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/sidebar",
      element: <ProtectedRoute><Sidebar /></ProtectedRoute>
    }

  ])
  

  return (
    <>
      <Toaster />
       <RouterProvider router={router} />
      
    </>
  )
}

export default App
