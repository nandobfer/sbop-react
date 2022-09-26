import './style.scss';

export const Etiquetinha = ({privado}) => {
    
    return (
        <div className={`etiquetinha ${privado ? 'privado' : 'publico'}`}>
            <p>{privado ? 'Privado' : 'Público'}</p>
        </div>
    )
}