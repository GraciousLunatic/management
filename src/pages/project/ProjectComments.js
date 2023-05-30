import { useAuthContext } from '../../hooks/useAuthContext';
import { useState } from 'react';
import { timestamp } from '../../firebase/config';
import { v4 as uuidv4 } from 'uuid';
import { useFirestore } from '../../hooks/useFirestore';
import Avatar from '../../components/avatar/Avatar';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default function ProjectComments({ project }) {
    const { user } = useAuthContext();
    const [ comment, setComment ] = useState('');
    const { response, updateDocument } = useFirestore('projects');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const commentToAdd = {
            user: user.displayName,
            photoURL: user.photoURL,
            comment,
            date: timestamp.fromDate(new Date()),
            id: uuidv4()
        };
        await updateDocument(project.id, {
            comments: [ ...project.comments, commentToAdd ]
        });
        if (!response.error){
            setComment('')
        }
    }
  return (
    <div className="project-comments">
        <form onSubmit={handleSubmit}>
            <h4>Project comments:</h4>
            <ul>
                {project.comments?.length > 0 && project.comments.map(comment => (
                    <li key={comment.id}>
                        <div className="comment-author">
                            <Avatar src={comment.photoURL} />
                            <p>{comment.user}</p>
                        </div>
                        <div className="comment-date">
                            <p>{formatDistanceToNow(comment.date.toDate(), {addSuffix: true})}</p>
                        </div>
                        <div className="comment-comment">
                            <p>{comment.comment}</p>
                        </div>
                    </li>
                ))}
            </ul>


            <label>
                <span>Leave a comment</span>
                <textarea type="text" required onChange={(e) => {setComment(e.target.value)}} value={comment}/>
            </label>
            <button className="btn">Submit</button>
        </form>
    </div>
  )
}
