import { userService } from "@/services/users/userService"
import { supabase } from "@/utils/supabase"
import { createContext, useContext, useEffect, useState } from "react"

export const AuthContext = createContext({
    session: null,
    user: null,
    mounting: true,
    refreshAuthUser: () => { }
})

export default function AuthProvider({ children }) {
    const [session, setSession] = useState(null)
    const [user, setUser] = useState(null)
    const [mounting, setMounting] = useState(true)

    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()

            if (session) {
                const { success, user } = await userService.getUser(session)
                if (success) {
                    setUser(user)
                }
            }

            setSession(session)
        }

        fetchSession()
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
        setMounting(false)
    }, [])

    const refreshAuthUser = async () => {
        if (session) {
            const { success, user } = await userService.getUser(session)
            if (success) {
                setUser(user)
            }
        }
    }

    return <AuthContext.Provider value={{ session, user, mounting, refreshAuthUser }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)