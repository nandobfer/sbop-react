import { useEffect } from 'react';
import { createContext, useState } from 'react';
import { api } from '../api';

const CategoriesContext = createContext({});

export default CategoriesContext;


export const CategoriesProvider = ({children}) => {
    const [value, setValue] = useState([])

    useEffect(() => {
        api.get('/get_category')
        .then(response => setValue(response.data))
        .catch(error => console.error(error))
    }, [])

    useEffect(() => {
       console.log(value)
    }, [value])

    return (
        <CategoriesContext.Provider value={{value, setValue}}>
            {children}
        </CategoriesContext.Provider>
    )
}