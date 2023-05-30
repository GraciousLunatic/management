import { useState, useEffect } from 'react';
import { auth, storage, db } from '../firebase/config';
import { useAuthContext } from './useAuthContext';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable,getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';


export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null);
    setIsPending(true);
  
    try {
      // signup
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (!res) {
        throw new Error('Could not complete signup');
      }

      //add a thumbnail to storage
      const storageRef = ref(storage, `thumbnails/${res.user.uid}/${thumbnail.name}`);
      const uploadThumbnail = await uploadBytesResumable(storageRef, thumbnail);
      const thumbnailUrl = await getDownloadURL(uploadThumbnail.ref);
      console.log(thumbnailUrl);      

      // add display name to user
      await updateProfile(auth.currentUser, { displayName, photoURL: thumbnailUrl });

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user });

      // add user to userCollection
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        photoURL: auth.currentUser.photoURL,
        displayName: auth.currentUser.displayName,
        online: true
      })

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending }
}