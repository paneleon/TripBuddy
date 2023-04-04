// context.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const AuthContext = React.createContext();

// USE THIS CREDENTIALS TO UPDATE HARDCODED TOKEN: 
// username: chandler123
// password: 123
const AuthContextProvider = ({children}) => {
    const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTY3YjVjZTVkZGQ0N2JlNzBiMjhmMiIsImlhdCI6MTY3OTgwNTkxMywiZXhwIjoxNjgyMzk3OTEzfQ.EhCKsGt6nR7SGukmAzX1PBu5CVifTyW_SvZxBeetLzE") // TODO: update after login and save to local storage
    const [userId, setUserId] = useState("")
    const [user, setUser] = useState({})
    const url = process.env.REACT_APP_SERVER_URL

    const getUserProfile = async () => {
      const response = await axios.get(`${url}/profile`, { headers: {
          'Authorization': 'Bearer ' + token
      }})
      setUser(response?.data)
      setUserId(response?.data?._id)
    }

    const value = { 
        userId: userId,
        setUserId: setUserId,
        token: token,
        setToken: setToken,
        user: user, 
        setUser: setUser
    }

    useEffect(() => {
      getUserProfile()
    }, [])

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