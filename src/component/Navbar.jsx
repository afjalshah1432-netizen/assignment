
import { Link } from 'react-router-dom'
import "../styles/navbar.css"

function Navbar() {
  return (
    <div className='navbar'>
      <div className="logo">assignment</div>
      <div className="navdiv">
        <Link to="/register" className="a">register</Link>
        <Link to="/login" className="a">login</Link>
        <Link to="/dash" className="a">dashboard</Link>
      </div>
    </div>
  )
}

export default Navbar
