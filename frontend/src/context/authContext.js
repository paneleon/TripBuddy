// context.js
import React, { useState } from 'react';
const AuthContext = React.createContext();

// USE THIS CREDENTIALS TO UPDATE HARDCODED TOKEN: 
// username: chandler123
// password: 123
const AuthContextProvider = ({children}) => {
    const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTY3YjVjZTVkZGQ0N2JlNzBiMjhmMiIsImlhdCI6MTY3OTE5Nzc3NSwiZXhwIjoxNjgxNzg5Nzc1fQ.Z5amVlx4ZXlWozbDT2igKqxLj8k6mStl1jCWlFSXsUw") // TODO: update after login and save to local storage
    const [userId, setUserId] = useState("64167b5ce5ddd47be70b28f2") // TODO: update after login and save to local storage
    const [user, setUser] = useState({
        // hardcoded user, fetch info from the db and save to local storage after
        firstName: "Chandler",
        lastName: "Bing",
        email: "cbing@gmail.com",
        username: "chandler123"
    })

    const value = { 
        userId: userId,
        setUserId: setUserId,
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