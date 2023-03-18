import { useLocation, useNavigate } from 'react-router-dom';
import { useMembro } from '../../hooks/useMembro';
import './style.scss';

export const Toolbar = ({page, setPage}) => {

    const HeaderButton = ({ path, title, description}) => {
        return (
            <div className={`${path.split('/perfil/')}-tooltip ${location.pathname.includes(path) ? 'active-tool' : null}`} onClick={() => navigate(path)} >
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
        )
    }

    const location = useLocation()
    const navigate = useNavigate()

    const [member, setMember] = useMembro()

    return (
         <div className="toolbar-container">
            <div className={`dados-tooltip ${location.pathname == '/perfil'  ? 'active-tool' : null}`} onClick={() => navigate('/perfil')} >
                <h1>Dados Cadastrais</h1>
                <p>Informações para o site</p>
            </div>
            <hr />
            <HeaderButton title='Segurança' description={'Alteração de senha e e-mail'} path='/perfil/seguranca' />
            <hr />
            <HeaderButton title='Planos' description={'Anuidade e pedidos do site'} path='/perfil/planos' />
            <hr />
            <HeaderButton title='Conteúdos' description={'Conteúdos exclusivos'} path='/perfil/conteudos' />
            <hr />
            <HeaderButton title='Solicitações' description={'Artigos JPOS e 2ª via de certificados'} path='/perfil/solicitacoes' />
            { member.adm ? <hr /> : null }
            { member.adm ? <div className={`solicitacoes-tooltip ${location.pathname.includes('/perfil/adm') ? 'active-tool' : null}`} onClick={() => navigate('/perfil/adm')} >
                <h1>Administração</h1>
                <p>Painel de controle administrativo</p>
            </div> : null}
         </div>
    )
}