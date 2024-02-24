import { createContext, useState } from "react";

export const Context = createContext({

})

const ContextProvider = ({ children }) => {

    const [isAuthorized, setAuthorized] = useState(false);
    const [user, setUser] = useState({});



    return <Context.Provider value={{ isAuthorized, setAuthorized, user, setUser }}>
        {children}
    </Context.Provider>
}
export default ContextProvider;