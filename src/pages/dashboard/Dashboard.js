import { useCollection } from '../../hooks/useCollection';
import ProjectsList from '../../components/projectsList/ProjectsList';
import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';

//styles and components
import './Dashboard.css';
import Filter from './Filter';


export default function Dashboard() {
  const { documents, error } = useCollection('projects');
  const [ filter, setFilter ] = useState('all');
  const { user } = useAuthContext();

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  }

  
  const projects = documents ? documents.filter((doc) => {
    switch (filter){
      case 'all':
        return true
      case 'mine':
        let assignedToMe = false;
        doc.assignedUsersList.forEach((u) => {
          if (user.uid === u.id){
            assignedToMe = true;
          }
        })
        return assignedToMe;
      case 'development':
      case 'sales':
      case 'design':
      case 'marketing':
          return doc.category === filter;
      default:
        return true
    }
  }) : null;

  return (
    <div>
      {error && <div className="error">{error}</div>}
      {documents && <Filter changeFilter={changeFilter} currentFilter={filter}/>}
      {projects && <ProjectsList projects={projects}/>}
    </div>
  )
}
