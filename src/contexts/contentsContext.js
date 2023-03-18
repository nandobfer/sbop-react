import { useEffect } from 'react';
import { createContext, useState } from 'react';
import { api } from '../api';

const ContentsContext = createContext({});

export default ContentsContext;


export const ContentsProvider = ({children}) => {
    const [value, setValue] = useState([])

    useEffect(() => {
       console.log(value)
    }, [value])

    return (
        <ContentsContext.Provider value={{value, setValue}}>
            {children}
        </ContentsContext.Provider>
    )
}