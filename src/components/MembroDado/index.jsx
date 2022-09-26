import { Etiquetinha } from '../Etiquetinha';
import './style.scss';

export const MembroDado = ({title, value, privado}) => {
    
    return (
    <div className='dado-container-component'>
        <div>
            <h1 className='title'>{title}</h1>
            <Etiquetinha privado={privado}/>
        </div>
        <p>{value}</p>
    </div>
    )
}