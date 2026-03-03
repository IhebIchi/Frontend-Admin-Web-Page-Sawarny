import {createContext,useEffect,useState } from "react";
import axiosClient from "../utils/axiosClient";
const AuthContext=createContext(null);

const AuthProvider=({children})=>{
    const [token,setToken]=useState(localStorage.getItem('Auth-Token')||null);
    const [user,setUser]=useState(null);

    useEffect(()=>{
        async function fetchMe(){
            try {
                const response= await axiosClient.get('/auth/me');
                setUser(response.data.user);
            } catch (error) {
                console.log(error.response.data.message);
            }
        }
        if (token){
            
            localStorage.setItem("Auth-Token",token);

            fetchMe();
        }


    },[token]);

    return(
        <AuthContext.Provider value={{token,setToken,user,setUser}} >

                {children}

        </AuthContext.Provider>
    )
};

export {AuthContext,AuthProvider};