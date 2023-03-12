import { useContext, useEffect } from 'react'
import { api } from '../api'
import SpecializationsContext from '../contexts/specializationsContext'

export const useSpecializations = () => {
    const specializationsContext = useContext(SpecializationsContext)

    useEffect(() => {
        if (specializationsContext.value.length == 0) {
            api.get('/get_specializations')
            .then((response) => {
                specializationsContext.setValue(response.data)
            })
        }    
    }, [specializationsContext.value])

    return [specializationsContext.value, specializationsContext.setValue]
}