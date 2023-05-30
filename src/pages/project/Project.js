import { useDocument } from '../../hooks/useDocument';
import { useParams } from 'react-router-dom';
import ProjectDetails from './ProjectDetails';
import ProjectComments from './ProjectComments';

//styles
import './Project.css';

export default function Project() {
  const { id } = useParams();
  const { document, error } = useDocument('projects', id);

  if (error){
    return <div className="error">{error}</div>
  }
  if (!document){
    return <div>Loading...</div>
  }
  return (
    <div className="project-details">
      {document && <ProjectDetails project={ document } />}
      {document && <ProjectComments project={ document }/>}
    </div>
  )
}
