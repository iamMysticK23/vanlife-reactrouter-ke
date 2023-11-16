// external imports
import { Link, NavLink } from "react-router-dom";

// internal imports
import avatarIcon from "../assets/images/avatar-icon.png"


export default function Header () {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#E17654"
    }

    function fakeLogOut(){
        localStorage.removeItem("loggedin")
    }

    return (
        <header>
            <Link className="site-logo" to="/">#VANLIFE</Link>
            <nav>
            <NavLink to="/host" style={({ isActive }) => isActive ? activeStyles : null }>Host</NavLink>
            <NavLink to="/about" style={({ isActive }) => isActive ? activeStyles : null }>About</NavLink>
            <NavLink to="/vans" style={({ isActive }) => isActive ? activeStyles : null }>Vans</NavLink>
            <Link to="login" className="login-link">
                    <img 
                        src={avatarIcon} 
                        className="login-icon"
                    />
                </Link>
                <button onClick={fakeLogOut}>X</button>
            </nav>        
        </header>
    )
}

