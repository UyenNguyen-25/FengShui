import { getUser } from "@/services/users/userService"
import { supabase } from "@/utils/supabase"
import { router } from "expo-router"
import { createContext, useContext, useEffect, useState } from "react"

export const AuthContext = createContext({
    session: null,
    user: null,
    mounting: true
})

export default function AuthProvider({ children }) {
    const [session, setSession] = useState(null)
    const [user, setUser] = useState(null)
    const [mounting, setMounting] = useState(true)

    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()

            setSession(session)

            if (session) {
                const { user } = async () => getUser(session);
                if (user) {
                    setUser(user)
                }
            }
        }

        fetchSession()
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
        setMounting(false)
    }, [])

    return <AuthContext.Provider value={{ session, user, mounting }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)