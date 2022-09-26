import './style.scss';

export const AcessoRestrito = ({page}) => {
    
    return (
        <div className={`restrito-container ${page === 'restrito' ? 'fadeIn' : 'fadeOut'}`}>
            <h1>restrito</h1>
        </div>
    )
}