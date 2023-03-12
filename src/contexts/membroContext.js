import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MembroContext = createContext({});

export default MembroContext;


export const MembroProvider = ({children}) => {
    const navigate = useNavigate()

    const [value, setValue] = useState({})

    useEffect(() => {
        if (!value?.id) {
            navigate('/')
        } else {
            console.log(value)
        }
    }, [value])

    return (
        <MembroContext.Provider value={{value, setValue}}>
            {children}
        </MembroContext.Provider>
    )
}