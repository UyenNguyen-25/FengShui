import { View, Text } from 'react-native'
import React, { createContext } from 'react'

const AuthContext = createContext({})

export default function AuthProvider() {
    return (
        <AuthContext.Provider value={{ user: "test" }}></AuthContext.Provider>
    )
}