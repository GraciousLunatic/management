import { useEffect, useState } from 'react';
import { auth, db } from '../firebase/config';
import { useAuthContext } from './useAuthContext';
import { signOut } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  
  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      //changing users document
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        online: false
      });

      // sign the user out
      await signOut(auth);
      
      // dispatch logout action
      dispatch({ type: 'LOGOUT' });

      // update state
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

  return { logout, error, isPending }
}