import './style.scss';

export const Toolbar = ({page, setPage}) => {
    
    return (
         <div className="toolbar-container">
            <div className={`dados-container ${page === 'dados' ? 'active-tool' : null}`} onClick={() => {setPage('dados')}}>
                <h1>Dados Cadastrais</h1>
                <p>Informações para o site</p>
            </div>
            <hr />
            <div className={`seguranca-container ${page === 'seguranca' ? 'active-tool' : null}`} onClick={() => {setPage('seguranca')}}>
                <h1>Segurança</h1>
                <p>Alteração de senha e e-mail</p>
            </div>
            <hr />
            <div className={`planos-container ${page === 'planos' ? 'active-tool' : null}`} onClick={() => {setPage('planos')}}>
                <h1>Planos</h1>
                <p>Anuidade e pedidos do site</p>
            </div>
            <hr />
            <div className={`restrito-container ${page === 'restrito' ? 'active-tool' : null}`} onClick={() => {setPage('restrito')}}>
                <h1>Acesso Restrito</h1>
                <p>Conteúdos exclusivos para membros</p>
            </div>
            <hr />
            <div className={`solicitacoes-container ${page === 'solicitacoes' ? 'active-tool' : null}`} onClick={() => {setPage('solicitacoes')}}>
                <h1>Solicitações</h1>
                <p>Arigos JPOS e 2ª via de certificados</p>
            </div>
         </div>
    )
}