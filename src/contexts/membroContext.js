import { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

const MembroContext = createContext({});

export default MembroContext;


export const MembroProvider = ({children}) => {
    const navigate = useNavigate()
    const storage = useLocalStorage()
    const location = useLocation()

    const [value, setValue] = useState(storage.get('member'))

    useEffect(() => {
        if(location.pathname != '/') {
            if (!value?.id) {
                navigate('/home')
            } else {
                console.log(value)
                storage.set('member', value)
            }
        }
    }, [value])


    return (
        <MembroContext.Provider value={{value, setValue}}>
            {children}
        </MembroContext.Provider>
    )
}