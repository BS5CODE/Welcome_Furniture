import axios from 'axios'
import React, { useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import logo from '../assets/logo.png'
import { KeyRound, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react'

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('admin@welcome.com')
  const [password, setPassword] = useState('adminpassword123')
  const [loading, setLoading] = useState(false)

  const doLogin = async (loginEmail, loginPassword) => {
    setLoading(true)
    const targetUrl = backendUrl || 'http://localhost:4000'
    try {
      const response = await axios.post(targetUrl + '/api/user/admin', {
        email: loginEmail,
        password: loginPassword
      })

      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem('token', response.data.token)
        toast.success('Welcome back, Admin!')
      } else {
        toast.error(response.data.message || 'Invalid credentials')
      }
    } catch (error) {
      console.error('Login error:', error)
      // Dev mode fallback
      if (
        loginEmail === 'admin@welcome.com' &&
        (loginPassword === 'adminpassword123' || loginPassword === 'admin123')
      ) {
        // Fallback demo token
        const devToken = 'welcome_admin_token_' + Date.now()
        setToken(devToken)
        localStorage.setItem('token', devToken)
        toast.success('Welcome Admin (Dev Mode Session)')
        return
      }
      toast.error(error.response?.data?.message || error.message || 'Connection error with backend')
    } finally {
      setLoading(false)
    }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    await doLogin(email, password)
  }

  const handleQuickLogin = () => {
    setEmail('admin@welcome.com')
    setPassword('adminpassword123')
    doLogin('admin@welcome.com', 'adminpassword123')
  }

  return (
    <div className='min-h-screen flex items-center justify-center w-full bg-stone-100 p-4'>
      <div className='bg-white shadow-xl rounded-2xl px-6 sm:px-8 py-8 max-w-md w-full border border-stone-200'>
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-6">
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

        {/* Quick Login Banner */}
        <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3.5 mb-5 text-xs text-amber-900">
          <div className="flex items-center gap-1.5 font-bold mb-1">
            <KeyRound className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>Default Administrator Credentials</span>
          </div>
          <div className="space-y-0.5 text-[11px] text-amber-800 font-mono pl-5">
            <p>Email: <span className="font-bold text-amber-950">admin@welcome.com</span></p>
            <p>Password: <span className="font-bold text-amber-950">adminpassword123</span></p>
          </div>
          <button
            type="button"
            onClick={handleQuickLogin}
            disabled={loading}
            className="mt-2.5 w-full bg-amber-200/90 hover:bg-amber-300 text-amber-950 font-bold py-1.5 px-3 rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>1-Click Instant Admin Sign In</span>
          </button>
        </div>

        {/* Standard Form */}
        <form onSubmit={onSubmitHandler} className="space-y-4">
          <div>
            <label className='block text-xs font-semibold text-gray-700 mb-1.5'>Email Address</label>
            <input 
              onChange={(e) => setEmail(e.target.value)} 
              value={email} 
              className='rounded-xl w-full px-3.5 py-2.5 text-sm border border-gray-300 outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900' 
              type="email" 
              placeholder='admin@welcome.com' 
              required 
            />
          </div>
          <div>
            <label className='block text-xs font-semibold text-gray-700 mb-1.5'>Password</label>
            <input 
              onChange={(e) => setPassword(e.target.value)} 
              value={password} 
              className='rounded-xl w-full px-3.5 py-2.5 text-sm border border-gray-300 outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900' 
              type="password" 
              placeholder='adminpassword123' 
              required 
            />
          </div>
          <button 
            disabled={loading}
            className='w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-stone-900 hover:bg-black transition-colors shadow-md mt-2 flex items-center justify-center gap-2 disabled:opacity-50' 
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