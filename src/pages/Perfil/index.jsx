import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AcessoRestrito } from '../../components/AcessoRestrito';
import { DadosCadastrais } from '../../components/DadosCadastrais';
import { Planos } from '../../components/Planos';
import { Seguranca } from '../../components/Seguranca';
import { Solicitacoes } from '../../components/Solicitacoes';
import { Toolbar } from '../../components/Toolbar';
import { Membro } from '../../contexts/Membro'
import './style.scss';

export const Perfil = () => {
    const location = useLocation().state;
    const [page, setPage] = useState('dados')
    const [membro, setMembro] = useContext(Membro)

    useEffect(() => {
        setMembro(location)
        console.log(membro);
    }, [membro])
    
    return (
        <div className="profile-page">
            <div className="main-container">
                <Toolbar page={page} setPage={setPage} />
                <DadosCadastrais page={page} />
                <Seguranca page={page} />
                <Planos page={page} />
                <AcessoRestrito page={page} />
                <Solicitacoes page={page} />
            </div>
        </div>
    )
}