import { useContext } from 'react'
import MembroContext from '../contexts/membroContext'

export const useMembro = () => {
   const membroContext = useContext(MembroContext);

   return [membroContext.value, membroContext.setValue]
}