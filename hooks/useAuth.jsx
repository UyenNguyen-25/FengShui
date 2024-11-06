import { signOut } from "@/services/auth/authService"
import { userService } from "@/services/users/userService"
import { supabase } from "@/utils/supabase"
import { createContext, useCallback, useContext, useEffect, useState } from "react"

export const AuthContext = createContext({
    session: null,
    user: null,
    mounting: true,
    refreshAuthUser: () => { },
})

export default function AuthProvider({ children }) {
    const [session, setSession] = useState(null)
    const [user, setUser] = useState(null)
    const [mounting, setMounting] = useState(true)

    const refreshAuthUser = useCallback(async () => {
        if (session) {
            const { success, msg, user } = await userService.getUser(session)
            if (success) {
                setUser(user)
            } else {
                console.log(msg)
            }
        } else {
            setUser(null)
        }
    }, [session])

    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            setSession(session)
            if (session) {
                await refreshAuthUser()
            }
            setMounting(false)
        }

        fetchSession()

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => {
            if (authListener?.subscription) {
                authListener.subscription.unsubscribe()
            }
        }
    }, [])

    useEffect(() => {
        refreshAuthUser()
        setMounting(false)
    }, [session, refreshAuthUser])

    return (
        <AuthContext.Provider value={{ session, user, mounting, refreshAuthUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
