import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DadosCadastrais } from '../../components/DadosCadastrais';
import { Planos } from '../../components/Planos';
import { Seguranca } from '../../components/Seguranca';
import { Toolbar } from '../../components/Toolbar';
import './style.scss';

export const Perfil = () => {
    const membro = useLocation().state;
    const [page, setPage] = useState('dados')

    useEffect(() => {
        console.log(membro);
    }, [membro])
    
    return (
        <div className="profile-page">
            <div className="main-container">
                <Toolbar page={page} setPage={setPage} />
                <DadosCadastrais page={page} />
                <Seguranca page={page} />
                <Planos page={page} />
            </div>
        </div>
    )
}