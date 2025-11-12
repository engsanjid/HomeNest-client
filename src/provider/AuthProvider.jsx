

import React, { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import app from "../firebase/firebase.init";;


export const AuthContext = createContext(null);


const auth = getAuth(app);


export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

   
    return () => unsubscribe();
  }, []);


  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

 
  const authInfo = { user, loading, logout };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
}
