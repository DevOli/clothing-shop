import { createContext, useState, useEffect } from "react";
import { onAuthStateChangeListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener((user) => {
      setCurrentUser(user);
      if(user) createUserDocumentFromAuth(user);
    })

    return unsubscribe
  }, []);
  const value = {
    currentUser,
    setCurrentUser,
  }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

