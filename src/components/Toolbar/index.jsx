import { useLocation, useNavigate } from 'react-router-dom';
import './style.scss';

export const Toolbar = ({page, setPage}) => {

    const location = useLocation()
    const navigate = useNavigate()

    return (
         <div className="toolbar-container">
            <div className={`dados-tooltip ${location.pathname === '/perfil' ? 'active-tool' : null}`} onClick={() => navigate('/perfil')} >
                <h1>Dados Cadastrais</h1>
                <p>Informações para o site</p>
            </div>
            <hr />
            <div className={`seguranca-tooltip ${location.pathname === '/perfil/seguranca' ? 'active-tool' : null}`} onClick={() => navigate('/perfil/seguranca')} >
                <h1>Segurança</h1>
                <p>Alteração de senha e e-mail</p>
            </div>
            <hr />
            <div className={`planos-tooltip ${location.pathname === '/perfil/planos' ? 'active-tool' : null}`} onClick={() => navigate('/perfil/planos')} >
                <h1>Planos</h1>
                <p>Anuidade e pedidos do site</p>
            </div>
            <hr />
            <div className={`restrito-tooltip ${location.pathname === '/perfil/conteudos' ? 'active-tool' : null}`} onClick={() => navigate('/perfil/conteudos')} >
                <h1>Acesso Restrito</h1>
                <p>Conteúdos exclusivos para membros</p>
            </div>
            <hr />
            <div className={`solicitacoes-tooltip ${location.pathname === '/perfil/solicitacoes' ? 'active-tool' : null}`} onClick={() => navigate('/perfil/solicitacoes')} >
                <h1>Solicitações</h1>
                <p>Arigos JPOS e 2ª via de certificados</p>
            </div>
         </div>
    )
}