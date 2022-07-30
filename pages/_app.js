import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./login";
import { auth, db } from "../firebase.js";
import Loading from "../components/Loading";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const updateUserProfile = async () => {
        await setDoc(
          doc(db, "users", user.uid),
          {
            email: user.email,
            lastSeen: serverTimestamp(),
            photoUrl: user.photoURL,
          },
          { merge: true }
        )
          .then(() => {
            console.log("saved successfuly");
          })
          .catch((Error) => console.log(Error));
      };
      updateUserProfile();
    }
  }, [user]);

  if (loading) return <Loading />;
  if (!user) return <Login />;

  return <Component {...pageProps} />;
}

export default MyApp;
