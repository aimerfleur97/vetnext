import React from 'react'
import Sidebar from '../Layouts/Sidebar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
// import Sidenav from '../Layouts/sidenav'

const Dashboard = ({children}) => {
  return (
    <div className="min-h-screen bg-white">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Sidebar />
      <div className='p-4 sm:ml-64'>{children}</div>
    </div>
  )
}

export default Dashboard