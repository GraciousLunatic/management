import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useCollection } from '../../hooks/useCollection';
import { timestamp } from "../../firebase/config";
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import { useNavigate } from 'react-router-dom';

//styles
import './Create.css';

const categories = [
  { value: "design", label: "Design" },
  { value: "development", label: "Development" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" }
];

export default function Create() {
  const { documents } = useCollection('users');
  const { user } = useAuthContext();
  const { addDocument, response } = useFirestore('projects');
  const [ users, setUsers ] = useState([]);
  const navigate = useNavigate();

  //form fields
  const [ name, setName ] = useState('');
  const [ details, setDetails ] = useState('');
  const [ date, setDate ] = useState('');
  const [ category, setCategory ] = useState('');
  const [ assignedUsers, setAssignedUsers ] = useState([]);
  const [ formError, setFormError ] = useState(null);

  const createdBy = {
    user: user.displayName,
    photoURL: user.photoURL,
    id: user.uid
  }

  const assignedUsersList = assignedUsers.map((u) => {
    return {
      user: u.value.displayName,
      photoURL: u.value.photoURL,
      id: u.value.id
    }
  })

  const project = {
    name,
    details,
    category: category.value,
    date: timestamp.fromDate(new Date(date)),
    assignedUsersList,
    createdBy,
    comments:[]
  }

  useEffect(()=>{
    if(documents){
      const options = documents.map((user) => {
      return ({ value: user , label: user.displayName })
    });
    setUsers(options);}
  },[documents])

  const hadleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!category){
      setFormError("Please choose a category");
      return
    }
    if (assignedUsers.length < 1){
      setFormError("Assign at least one user");
      return
    }

    await addDocument(project);
    if (!response.error){
      navigate('/');
    }
  }
  return (
    <div className="create-form">
      <h2 className="page-title">Create a project</h2>
      <form onSubmit={hadleSubmit}>
        <label>
          <span>Project name:</span>
          <input type="text" required onChange={ (e) => setName(e.target.value) } value={name}/>
        </label>
        <label>
          <span>Details:</span>
          <textarea type="text" required onChange={ (e) => setDetails(e.target.value) } value={details}/>
        </label>
        <label>
          <span>Date:</span>
          <input type="date" required onChange={ (e) => setDate(e.target.value) } value={date}/>
        </label>
        <label>
          <span>Category:</span>
          <Select options={categories} onChange={(o) => setCategory(o)}/>
        </label>
        <label>
          <span>Assigned users:</span>
          <Select options={users} onChange={(o) => setAssignedUsers(o)} isMulti />
        </label>
        <button className="btn">Add project</button>
        {formError && <div className="error">{formError}</div>}
      </form>        
    </div>
  )
}
