import React, { createContext, useContext, useEffect, useState } from "react"
import { Auth, onAuthStateChanged, User } from "firebase/auth"

type AuthContextValue = {
    user: User | null
    loading: boolean
}

type AuthProviderProps = {
    children: React.ReactNode
    auth: Auth
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const FirebaseAuthProvider: React.FC<AuthProviderProps> = ({ children, auth }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            setUser(u)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>
}

export const useFirebaseAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error("useFirebaseAuth must be used within a FirebaseAuthProvider")
    return context
}
