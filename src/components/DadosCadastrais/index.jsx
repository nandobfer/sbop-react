import './style.scss';

export const DadosCadastrais = ({page}) => {
    
    return (
        <div className={`dados-container ${page === 'dados' ? 'fadeIn' : 'fadeOut'}`}>
            <h1>Dados</h1>
        </div>
    )
}