import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route, Navigate } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Categories from './pages/Categories'
import Orders from './pages/Orders'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'
export const currency = '₹'

const App = () => {
  const [token, setToken] = useState(() => {
    try {
      const saved = localStorage.getItem('token')
      if (!saved || saved === 'undefined' || saved === 'null' || saved.trim() === '') {
        return ''
      }
      return saved
    } catch {
      return ''
    }
  })

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }, [token])

  return (
    <div className='bg-gray-50 min-h-screen flex flex-col font-sans'>
      <ToastContainer position="top-right" autoClose={3000} />
      {token === '' ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <div className='flex flex-1 w-full'>
            <Sidebar />
            <main className='flex-1 p-3.5 sm:p-6 md:p-10 max-w-7xl w-full overflow-x-hidden pb-20 md:pb-10'>
              <Routes>
                <Route path='/' element={<Navigate to='/list' replace />} />
                <Route path='/add' element={<Add token={token} />} />
                <Route path='/list' element={<List token={token} />} />
                <Route path='/categories' element={<Categories token={token} />} />
                <Route path='/orders' element={<Orders token={token} />} />
                <Route path='*' element={<Navigate to='/list' replace />} />
              </Routes>
            </main>
          </div>
        </>
      )}
    </div>
  )
}

export default App
