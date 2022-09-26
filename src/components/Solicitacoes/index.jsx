import './style.scss';

export const Solicitacoes = ({page}) => {
    
    return (
        <div className={`solicitacoes-container ${page === 'solicitacoes' ? 'fadeIn' : 'fadeOut'}`}>
            <h1>solicitacoes</h1>
        </div>
    )
}