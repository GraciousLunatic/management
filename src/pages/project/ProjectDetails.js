import Avatar from "../../components/avatar/Avatar";
import { useFirestore } from "../../hooks/useFirestore";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function ProjectDetails({ project }) {
    const { deleteDocument } = useFirestore('projects');
    const navigate = useNavigate();
    const { user } = useAuthContext();

    const handleClick = () => {
        deleteDocument(project.id);
        navigate('/');
    }
  return (
    <div>
        <div className="project-summary">
            <h2 className="page-title">{project.name}</h2>
            <p className="due-date">{`Due date: ${project.date && project.date.toDate().toDateString()}`}</p>
            <p className="details">{project.details}</p>
            <h4>Assigned users:</h4>
            <div className="assigned-users">
                {project.assignedUsersList?.map((u) => (
                    <div key={u.id}>
                        <Avatar src={u.photoURL} />
                    </div>
                ))}
            </div>
        </div>
        {user?.uid === project.createdBy?.id && (
            <button className="btn" onClick={handleClick}>Click to complete the project</button>
        )}
    </div>
  )
}
