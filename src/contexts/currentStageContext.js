import { createContext, useState } from 'react';

const CurrentStageContext = createContext({});

export default CurrentStageContext;


export const CurrentStageProvider = ({children}) => {
    const [value, setValue] = useState(1)

    return (
        <CurrentStageContext.Provider value={{value, setValue}}>
            {children}
        </CurrentStageContext.Provider>
    )
}