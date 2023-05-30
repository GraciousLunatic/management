import { Link } from "react-router-dom";
import Avatar from "../avatar/Avatar";

//styles
import "./ProjectsList.css";

export default function ProjectsList({ projects }) {
  return (
    <div className="project-list">
        {projects.length === 0 && <p>There are no projects</p>}
        {projects.map((p) => 
           (<Link to={`/projects/${p.id}`} key={p.id}>
                <h4>{p.name}</h4>
                <p>{`Due date: ${p.date.toDate().toDateString()}`}</p>
                <div className="assigned-to">
                    <ul>
                        {p.assignedUsersList.map((user) => (
                            <li key={user.photoURL}>
                                <Avatar src={user.photoURL} />
                            </li>
                        ))}
                    </ul>
                </div>
            </Link>
        ))}
    </div>
  )
}


