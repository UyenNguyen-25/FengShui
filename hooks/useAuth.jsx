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
    const currentPathname = window.location?.pathname

    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()

            setSession(session)

            if (!session && currentPathname?.includes("/(main)")) {
                router.push('/')
            } else if (session) {
                const { data: user, error } = await supabase.from('users').select('*').eq('id', session.user.id).single()
                if (error) {
                    console.log("get user from db fail: ", error);
                    await supabase.auth.signOut()
                } else {
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