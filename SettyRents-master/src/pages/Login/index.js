import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './index.css'

const Login = () => {
const navigate = useNavigate()

const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState('')

const handleSubmit = e => {
e.preventDefault()


// Temporary login (we connect backend later)
if (username === 'admin' && password === 'admin123') {
  localStorage.setItem('token', 'sampletoken')
  navigate('/dashboard')
} else {
  setError('Invalid Username or Password')
}


}

return ( <div className="login-container"> <form className="login-card" onSubmit={handleSubmit}> <h2 className="login-title">Rent Management</h2>


    <label>Username</label>
    <input
      type="text"
      placeholder="Enter username"
      value={username}
      onChange={e => setUsername(e.target.value)}
    />

    <label>Password</label>
    <input
      type="password"
      placeholder="Enter password"
      value={password}
      onChange={e => setPassword(e.target.value)}
    />

    {error && <p className="error">{error}</p>}

    <button type="submit" className="login-btn">
      Login
    </button>
  </form>
</div>


)
}

export default Login
