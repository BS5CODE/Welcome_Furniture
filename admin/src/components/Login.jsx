import axios from 'axios'
import React, { useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import logo from '../assets/logo.png'
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const doLogin = async (loginEmail, loginPassword) => {
    setLoading(true)
    const targetUrl = backendUrl || 'http://localhost:4000'
    try {
      const response = await axios.post(`${targetUrl}/api/user/admin`, {
        email: loginEmail.trim(),
        password: loginPassword
      })

      if (response.data.success && response.data.token) {
        setToken(response.data.token)
        localStorage.setItem('token', response.data.token)
        toast.success('Welcome back, Admin!')
      } else {
        toast.error(response.data.message || 'Invalid email or password')
      }
    } catch (error) {
      console.error('Login error:', error)
      const msg = error.response?.data?.message || error.message || 'Unable to connect to backend server'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (!email.trim() || !password) {
      toast.error('Please enter both email and password')
      return
    }
    await doLogin(email, password)
  }

  return (
    <div className='min-h-screen flex items-center justify-center w-full bg-stone-100 p-4'>
      <div className='bg-white shadow-xl rounded-2xl px-6 sm:px-8 py-9 max-w-md w-full border border-stone-200'>
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <img 
            src={logo} 
            alt="Welcome Enterprise" 
            className="h-16 w-auto object-contain rounded-lg mb-3 shadow-xs" 
          />
          <h1 className='text-xl sm:text-2xl font-bold text-stone-900'>Admin Control Panel</h1>
          <p className="text-xs text-stone-500 mt-1">
            Welcome Furniture & Architectural Hardware
          </p>
        </div>

        {/* Secure Login Form */}
        <form onSubmit={onSubmitHandler} className="space-y-4">
          <div>
            <label className='block text-xs font-semibold text-gray-700 mb-1.5'>
              Admin Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              <input 
                onChange={(e) => setEmail(e.target.value)} 
                value={email} 
                className='rounded-xl w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition-all' 
                type="email" 
                placeholder='welcomefurniture.co@gmail.com' 
                required 
                autoFocus
              />
            </div>
          </div>

          <div>
            <label className='block text-xs font-semibold text-gray-700 mb-1.5'>
              Admin Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              <input 
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
                className='rounded-xl w-full pl-10 pr-10 py-2.5 text-sm border border-gray-300 outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition-all' 
                type={showPassword ? "text" : "password"} 
                placeholder='Enter your password' 
                required 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-stone-400 hover:text-stone-700 p-0.5"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button 
            disabled={loading}
            className='w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-stone-900 hover:bg-black transition-colors shadow-md mt-3 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer' 
            type="submit"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Admin Panel'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
