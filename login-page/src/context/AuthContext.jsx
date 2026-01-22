import {createContext, useContext, useEffect, useState} from "react";
import requests from "@/api/apiClient.js";
import {toast} from "react-toastify";

const AuthContext = createContext(null);

async function fetchUserData() {
    try {
        const {user} = await requests.account.fetchMe();
        return user;
    } catch {
        return null;
    }

}

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const refreshUser = async () => {
        const me = await fetchUserData();
        setUser(me);

    }
    useEffect(() => {
        refreshUser().finally(() => setLoading(false));
    }, []);

    return(
        <AuthContext.Provider value={{user, setUser, loading, refreshUser}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuthContext must be used within an AuthProvider");
    return context;
}
