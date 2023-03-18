import './style.scss';

export const Content = ({ content }) => {
    
    return (
        <div className='Content-Component' >
            <p>{content?.titulo}</p>
        </div>
    )
}