import { NavLink } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';

//styles and logos
import './Navbar.css';
import Management from '../../assets/management.svg';

export default function Navbar() {
    const { logout, isPending, error } = useLogout();
    const { user, authIsReady } = useAuthContext();
  return (
    <nav className="navbar">
        {authIsReady && (<ul>
            <li className="logo">
                <img src={Management} alt="Management! logo"/>
                <NavLink to="/">
                    <span>Management!</span>
                </NavLink>
            </li>
            {!user && <li>
                <NavLink to="/login">
                    Login
                </NavLink>
            </li>}
            {!user && <li>
                <NavLink to="/signup">
                    Signup
                </NavLink>
            </li>}
            {user && <li>
                {!isPending && <button className="btn" onClick={logout}>Logout</button>}
                {isPending && <button className="btn" disabled>Logging out...</button>}
                {error && <div className="error">{error}</div>}
            </li>}
        </ul>)}
    </nav>
  )
}
