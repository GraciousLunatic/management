import { useEffect, useState, useRef } from "react";
import { db } from "../firebase/config";
import { onSnapshot, collection, query, where, orderBy } from "firebase/firestore";

export const useCollection = (_collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  // if we don't use a ref --> infinite loop in useEffect
  // _query is an array and is "different" on every function call

  const q = useRef(_query).current;
  //orderBy
  const oB = useRef(_orderBy).current;

  useEffect(() => {
    let ref = collection(db, _collection);

    if (q) {
      ref = query(ref, where(...q));
    }
    if (oB) {
      ref = query(ref, orderBy(...oB));
    }

    const unsubscribe = onSnapshot(ref, snapshot => {
      let results = [];
      snapshot.docs.forEach(doc => {
        results.push({...doc.data(), id: doc.id});
      });
      
      // update state
      setDocuments(results);
      setError(null);
    }, error => {
      console.log(error);
      setError('could not fetch the data');
    })

    // unsubscribe on unmount
    return () => unsubscribe();

  }, [_collection, q, oB]);

  return { documents, error }
}