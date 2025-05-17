import { createContext, useEffect } from "react";
import { useState } from "react";
import { data } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = (props)=>{

    axios.defaults.withCredentials = true;

    const backendurl = import.meta.env.VITE_BACKEND_URL ;
    const [isloggedin, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(false);

    const getAuthState = async ()=> {
        try {
            const {data} = await axios.get(backendurl + '/api/auth/is-auth');
            if (data.success) {
                setIsLoggedIn(true);
                getUserData();

            }
        } catch (error) {
            toast.error(error.message)
            
        }
    }
    const getUserData = async () => {
        try {
            const {data} = await axios.get(backendurl + '/api/user/data')
            data.success ? setUserData(data.userData) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
            
        }
    }

    useEffect(()=>{
        getAuthState();
    },[])

    const value = {
        backendurl,
        isloggedin, setIsLoggedIn,
        userData, setUserData,
        getUserData

    }
    
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}