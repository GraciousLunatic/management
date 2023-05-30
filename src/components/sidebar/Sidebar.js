import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

//components
import Avatar from "../avatar/Avatar";

//styles and images
import './Sidebar.css';
import DashboardImage from "../../assets/dashboard_icon.svg";
import AddIcon from "../../assets/add_icon.svg";

export default function Sidebar() {
    const { user } = useAuthContext();
  return (
    <div className="sidebar">
        <div className="sidebar-content">
            <div className="user">
                <Avatar src={user.photoURL}/>
                <p>Hey {user.displayName}</p>
            </div>
            <nav className="links">
                <ul>
                    <li>
                        <NavLink to="/">
                            <img src={DashboardImage} alt="dashboard pic"/>
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/create">
                            <img src={AddIcon} alt="add pic"/>
                            <span>New project</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
  )
}
