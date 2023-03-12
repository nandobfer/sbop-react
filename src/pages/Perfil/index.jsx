import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AcessoRestrito } from '../../components/AcessoRestrito';
import { DadosCadastrais } from '../../components/DadosCadastrais';
import { Planos } from '../../components/Planos';
import { Seguranca } from '../../components/Seguranca';
import { Solicitacoes } from '../../components/Solicitacoes';
import { Toolbar } from '../../components/Toolbar';
import { useMembro } from '../../hooks/useMembro';
import './style.scss';

export const Perfil = () => {
    const [page, setPage] = useState('dados')
    const [membro, setMembro] = useMembro()

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