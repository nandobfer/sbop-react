import './style.scss';

export const Planos = ({page}) => {
    
    return (
        <div className={`planos-container ${page === 'planos' ? 'fadeIn' : 'fadeOut'}`}>
            <h1>Planos</h1>
        </div>
    )
}