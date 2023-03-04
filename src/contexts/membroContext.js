import { createContext, useEffect, useState } from 'react';

const MembroContext = createContext({});

export default MembroContext;


export const MembroProvider = ({children}) => {
    const [value, setValue] = useState({})

    useEffect(() => {
        console.log(value)
    }, [value])

    return (
        <MembroContext.Provider value={{value, setValue}}>
            {children}
        </MembroContext.Provider>
    )
}