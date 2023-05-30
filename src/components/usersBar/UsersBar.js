//hooks
import { useCollection } from "../../hooks/useCollection";

//styles
import "./UsersBar.css";

//components
import Avatar from "../avatar/Avatar";

export default function UsersBar() {
    const { documents, error } = useCollection('users');
  return (
    <div className="user-list">
        <h2>All the users:</h2>
        {error && <div className="error">{error}</div>}
        {documents && documents.map(user => (
            <div className="user-list-item" key={user.id}>
                {user.online ? (<span className="online-user"></span>) : (<span className="online-user" style={{background: "red"}}></span>)}
                <span>{user.displayName}</span>
                <Avatar src={user.photoURL}/>
            </div>
        ))}
    </div>
  )
}

