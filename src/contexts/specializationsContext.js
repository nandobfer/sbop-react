import { createContext, useState } from 'react';

const SpecializationsContext = createContext({});

export default SpecializationsContext;


export const SpecializationsProvider = ({children}) => {
    const [value, setValue] = useState([])

    return (
        <SpecializationsContext.Provider value={{value, setValue}}>
            {children}
        </SpecializationsContext.Provider>
    )
}