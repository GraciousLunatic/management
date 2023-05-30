import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
//styles
import './Signup.css';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);

  const { signup, error, isPending } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!thumbnailError){
      signup(email,password,displayName,thumbnail);
    }
  }

  const handleThumbnail = (e) => {
      setThumbnail(null);
      const uploadedFile = e.target.files[0];

      if (!uploadedFile){
        setThumbnailError('Please select an image');
        return
      }
      if (!uploadedFile.type.includes('image')){
        setThumbnailError('Selected file supposed to be an image');
        return
      }
      if (uploadedFile.size > 100000) {
        setThumbnailError('Selected file should be less than 100kb');
        return
      }

      setThumbnailError(null);
      setThumbnail(uploadedFile)
  }
  
  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <label>
        <span>email:</span>
        <input 
          required
          type="email"
          onChange={(e)=>setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input 
          required
          type="password"
          onChange={(e)=>setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>display name:</span>
        <input 
          required
          type="text"
          onChange={(e)=>setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>thumbnail:</span>
        <input 
          required
          type="file"
          onChange={handleThumbnail}
        />
        {thumbnailError && <div className='error'>{thumbnailError}</div>}
      </label>
      {!isPending && <button className="btn">Signup</button>}
      {isPending && <button className="btn" disabled>loading...</button>}
      {error && <div className="error">{error}</div>}
    </form>
  )
}
