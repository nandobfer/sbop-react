import { useContext } from 'react'
import ContentsContext from '../contexts/contentsContext'

export const useContents = () => {
   const contentsContext = useContext(ContentsContext);

   return [contentsContext.value, contentsContext.setValue]
}