import { useContext } from 'react'
import SpecializationsContext from '../contexts/specializationsContext'

export const useSpecializations = () => {
   const specializationsContext = useContext(SpecializationsContext)

   return [specializationsContext.value, specializationsContext.setValue]
}