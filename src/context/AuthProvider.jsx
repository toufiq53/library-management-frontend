import React, { createContext, useEffect, useState } from 'react';
import { baseUrl } from '../services/BaseUrl';


export const AuthContext = createContext();
const AuthProvider = ({ children }) => {

    const [authUser, setAuthUser] = useState(null)
    const[loading,setLoading]=useState(true)

    const accessToken = localStorage.getItem('lm_token')
    const fetchUser = async () => {
        const userRes = await fetch(`${baseUrl}/user`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        const userData = await userRes.json()

        setAuthUser(userData)
        setLoading(false)
    }
    useEffect(() => {
        if (!accessToken) {
            setAuthUser(null)
            setLoading(false)
            return
        }
        fetchUser()
    }, [accessToken])

    const logout=()=>{
        localStorage.removeItem('lm_token')
        setAuthUser(null)
        
    }

    console.log(authUser);
    return (
        <AuthContext.Provider value={{ authUser, setAuthUser,logout,accessToken,loading }}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;