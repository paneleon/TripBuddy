// context.js
import React, { useState } from 'react';
const AuthContext = React.createContext();


const AuthContextProvider = ({children}) => {
    const [token, setToken] = useState("hello there")
    const [user, setUser] = useState({
        firstName: "Ella",
        lastName: "Panussyants"
    })

    const value = { 
        token: token,
        setToken: setToken,
        user: user, 
        setUser: setUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
        )
  }
  

  const useAuth = () => {
    const context = React.useContext(AuthContext)
    if (context === undefined) {
      throw new Error('useAuth must be used within a AuthContextProvider')
    }
    return context
  }
  
  export {AuthContextProvider, useAuth}