import { NavLink } from "react-router-dom";
import "../../styles/layout.css";
import icon from "../../assets/icon.png";

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={icon} alt="icon"/>
            </div>

            <div className="navbar-links">
                <NavLink to="/" className="nav-link">
                    Home
                </NavLink>
                <NavLink to="/products" className="nav-link">
                    Products
                </NavLink>
                <NavLink to="/users" className="nav-link">
                    Users
                </NavLink>
                <NavLink to="/login" className="nav-link">
                    Login
                </NavLink>
            </div>
        </nav>
    );
}
