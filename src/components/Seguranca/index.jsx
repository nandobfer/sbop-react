import './style.scss';

export const Seguranca = ({current}) => {
    
    return (
        <div className={`seguranca-container ${current ? 'fadeIn' : 'fadeOut'}`}>
            <h1>Segurança</h1>
        </div>
    )
}