import { useCollection } from 'react-firebase-hooks/firestore';
import React, { useEffect } from "react";
import { auth, db } from "../firebase";
import { collection, doc, query, addDoc, where, FieldPath } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";


const FirestoreCollection = () => {
  const [value, loading, error] = useCollection(
    collection(db, 'chats'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  return (
    <div>
      <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Collection: Loading...</span>}
        {value && (
          <span>
            {value.docs.map((doc) => (
              <React.Fragment key={doc.id}>
                {JSON.stringify(doc.get('users'))},
              </React.Fragment>
            ))}
          </span>
        )}
      </p>
    </div>
  );
};

export default FirestoreCollection;