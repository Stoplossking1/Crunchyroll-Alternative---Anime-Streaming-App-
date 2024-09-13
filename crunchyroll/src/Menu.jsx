import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

const Menu = () => {
    const { token, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="navbar is-link" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link to="/" className="navbar-item">TP2</Link>
            </div>
            <div className="navbar-menu">
                <div className="navbar-end">
                    {token ? (
                        <>
                            <Link to="/history" className="navbar-item">History</Link>
                            <Link to="/profile" className="navbar-item">Profile</Link>
                            <div className="navbar-item">
                                <button className="button is-link" onClick={handleLogout}>Logout</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/signup" className="navbar-item">Sign Up</Link>
                            <Link to="/login" className="navbar-item">Login</Link>
                        </>
                    )}
                    <Link to="/about" className="navbar-item">About</Link>
                </div>
            </div>
        </nav>
    );
};

export default Menu;
