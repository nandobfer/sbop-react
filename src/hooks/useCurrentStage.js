import { useContext } from 'react'
import CurrentStageContext from '../contexts/currentStageContext'

export const useCurrentStage = () => {
   const currentStageContext = useContext(CurrentStageContext)

   return [currentStageContext.value, currentStageContext.setValue]
}