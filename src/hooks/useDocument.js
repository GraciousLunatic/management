import { useState, useEffect } from 'react';
import { db } from "../firebase/config";
import { onSnapshot, doc } from "firebase/firestore";

export const useDocument = (collection, id) => {
    const [ document, setDocument ] = useState({});
    const [ error, setError ] = useState(null);

    useEffect(()=> {
        const docRef = doc(db, collection, id);
        const unsub = onSnapshot(docRef, 
            (d) => {
                if (d.data()){
                    setError(null);
                    setDocument({...d.data(), id: d.id});}
                else {
                    setError('the id of the document is incorrect')
                }},
            (err) => {
                console.log(err.message);
                setError('could not fetch any document');
            })
        return () => unsub();
    },[collection,id])
    
    return { document, error }
}