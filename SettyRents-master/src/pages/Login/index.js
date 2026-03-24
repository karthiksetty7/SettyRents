// login/index.js
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {FiEye, FiEyeOff} from 'react-icons/fi'
import logo from '../../SettyRents.png'
import './index.css'

const Login = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = e => {
    e.preventDefault()

    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('token', 'sampletoken')
      navigate('/dashboard')
    } else {
      setError('Invalid Username or Password')
    }
  }

  return (
    <div className='login-container'>
      <form className='login-card' onSubmit={handleSubmit}>
        <img src={logo} alt='logo' className='login-logo' />

        <label htmlFor='username'>Username</label>
        <input
          id='username'
          type='text'
          placeholder='Enter username'
          value={username}
          onChange={e => setUsername(e.target.value)}
          autoComplete='username'
          required
        />

        <label htmlFor='password'>Password</label>
        <div className='password-wrapper'>
          <input
            id='password'
            type={showPassword ? 'text' : 'password'}
            placeholder='Enter password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete='current-password'
            required
          />
          <button
            type='button'
            className='toggle-password-btn'
            onClick={() => setShowPassword(prev => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        {error && <p className='error'>{error}</p>}

        <button type='submit' className='login-btn'>
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
