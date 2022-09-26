import './style.scss';

export const DadosCadastrais = ({current}) => {
    
    return (
        <div className={`dados-container ${current ? 'fadeIn' : 'fadeOut'}`}>
            <h1>Dados</h1>
        </div>
    )
}