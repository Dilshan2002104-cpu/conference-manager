import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <nav className="navbar">
                <button 
                    className="mobile-menu-btn" 
                    onClick={toggleSidebar}
                    aria-label="Toggle menu"
                >
                    {isSidebarOpen ? '✕' : '☰'}
                </button>
                <div className="navbar-left">
                    <Link to="/" className="logo" aria-label="Home">Conference Manager</Link>
                </div>
                <div className={`navbar-center ${isSidebarOpen ? 'active' : ''}`}>
                    <ul className="nav-links">
                        <li>
                            <NavLink to="/home" activeClassName="active-link">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/session" activeClassName="active-link">Session</NavLink>
                        </li>
                        <li>
                            <NavLink to="/schedule" activeClassName="active-link">Schedule</NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin" activeClassName="active-link">Admin</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
            <div 
                className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`}
                onClick={toggleSidebar}
            />
        </>
    );
};

export default Navbar;