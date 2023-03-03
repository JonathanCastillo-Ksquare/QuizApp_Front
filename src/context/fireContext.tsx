import React from 'react';
import { createContext, useState, useContext, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { firebaseConfig } from '../firebaseConfig';
import { initializeApp } from 'firebase/app';

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

type Props = {
  children: JSX.Element;
};

interface LoginContextType {
  userToken: string;
  setUserToken: React.Dispatch<React.SetStateAction<string>>;
  user: any;
  logIn: (email: string, password: string) => Promise<any>;
  logOut: () => any;
  loading: any;
}

let LoginContext = createContext<LoginContextType>({} as LoginContextType);

export function LoginContextProvider({ children }: Props) {

  // State variables
  const [userToken, setUserToken] = useState('');
  const [user, setUser] = useState<any>({});
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   localStorage.setItem("token", userToken)
  // }, [userToken])

  const logIn = async (email: string, password: string) => {
    try {
      const loggedUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      return loggedUser;
    } catch (error: any) {
      console.error(error);
    }
  };

  const logOut = () => {
    signOut(auth);
  };

  // checks for auth change to update the user
  useEffect(() => {
    onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
      setLoading(false);
    });
  }, []);

  // Values that will be availables in the context
  let value = {
    userToken,
    setUserToken,
    user,
    logIn,
    logOut,
    loading
  }

  return <LoginContext.Provider value={value} > {children} </LoginContext.Provider>
}

// Custom hook to use the data of the context
export function useLoginContext() {
  return useContext(LoginContext);
}