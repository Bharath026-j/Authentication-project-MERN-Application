import { createContext } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props)=>{

    const backendurl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
    const [isloggedin, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(false);

    const value = {
        backendurl,
        isloggedin,
        setIsLoggedIn,
        userData,
        setUserData

    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}