import React, { Children, createContext, useContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";


const authContext = createContext();


const ContextProvider =({children})=>{
    const [user , setUser] = useState(null);
    // set user value to diplay after loggin

    const login = (user)=>{
        setUser(user);
    }

    const logout = ()=>{
        localStorage.removeItem('token')
        setUser(null);
    }

    useEffect(()=>{
        const verifyUser = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/auth/verify' ,
                     {headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                     }})
                if(res.data.success){
                    setUser(res.data.user);
                }
                else{
                    setUser(null);
                }
            } catch (error) {
                console.log(error)
            }
        }
        verifyUser();
    } , []);


    return (
        <authContext.Provider value={{user , login , logout}}>
            {children}
        </authContext.Provider>
    )
};

export const userAuth = ()=> useContext(authContext)

export default ContextProvider