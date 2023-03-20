import './style.scss';

export const Content = ({ content }) => {
    
    return (
        <div className='Content-Component' >
            <h1>{content.titulo}</h1>
            <p>{content.resumo}</p>
            <p dangerouslySetInnerHTML={{__html: content.conteudo}}></p>
            <div className="autor-container">
                <p>{content.data}</p>
                <p>{content.autor}</p>
            </div>
            <hr />
        </div>
    )
}