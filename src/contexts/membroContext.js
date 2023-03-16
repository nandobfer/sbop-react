import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

const MembroContext = createContext({});

export default MembroContext;


export const MembroProvider = ({children}) => {
    const navigate = useNavigate()
    const storage = useLocalStorage()

    const [value, setValue] = useState(storage.get('member') || null)

    useEffect(() => {
        if (!value?.id) {
            navigate('/home')
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