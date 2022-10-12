import React, { createContext, useState} from "react";

export const userContext = createContext()

function UserProvider ({children}) {
    const [user, setUser] = useState(localStorage.getItem('user') || false)

    return (
        <userContext.Provider value={{user, setUser}}>
            {children}
        </userContext.Provider>
    )

}

export default UserProvider