import './style.scss';

export const Seguranca = ({page}) => {
    
    return (
        <div className={`seguranca-container ${page === 'seguranca' ? 'fadeIn' : 'fadeOut'}`}>
            <h1>Segurança</h1>
        </div>
    )
}