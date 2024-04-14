import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, 
            signInWithEmailAndPassword, 
            signOut, 
            onAuthStateChanged } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthContextPovider({children}){
    const[user, setUser] = useState({});

    function signUp(email, password){
        const user = createUserWithEmailAndPassword(auth, email,password);
        setDoc(doc(db, 'users', email),{
            savedShows:[]
        });
        return user;
    }

    function logIn(email, password){
        return signInWithEmailAndPassword(auth,email,password);
    }

    function logOut(){
        return signOut(auth);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
        });
        return()=>{
            unsubscribe();
        }
    })
    return(
        <AuthContext.Provider value={{signUp, logIn, logOut, user}}>
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth(){
    return useContext(AuthContext)
}