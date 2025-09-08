import React, { Children, createContext, useContext, useState } from "react";

const authContext = createContext();


const ContextProvider =({children})=>{
    const [user , setUser] = useState(null);
    // set user value to diplay after loggin

    const login = (user)=>{
        setUser(user);
    }

    return (
        <authContext.Provider value={{user , login}}>
            {children}
        </authContext.Provider>
    )
};

export const userAuth = ()=> useContext(authContext)

export default ContextProvider