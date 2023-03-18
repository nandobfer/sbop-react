import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AcessoRestrito } from '../../components/AcessoRestrito';
import { DadosCadastrais } from '../../components/DadosCadastrais';
import { Planos } from '../../pages/Planos';
import { Seguranca } from '../../components/Seguranca';
import { Solicitacoes } from '../../components/Solicitacoes';
import { Toolbar } from '../../components/Toolbar';
import { useMembro } from '../../hooks/useMembro';
import './style.scss';
import { LoadingScreen } from '../../components/LoadingScreen';
import { AdmPanel } from '../AdmPanel';

export const Perfil = () => {
    const [page, setPage] = useState('dados')
    const [membro, setMembro] = useMembro()
    const [loading, setLoading] = useState(false)
    
    const tryLogin = () => {
        const iframe = document.getElementById('flask_iframe').contentWindow;

        // Send a message to the iframe
        iframe.postMessage({type: 'login', user: membro.user, password: membro.senha}, 'https://sistema.sbop.com.br:5001/home/');
    
    }

    useEffect(() => {
        // const handleMessage = (event) => {
      
        //     const data = event.data;
      
        //     // Handle the message data
        //     console.log('Received message:', data);
        //     setTimeout(() => setLoading(false), 4000)
        // };
      
        // // Add the message listener
        // window.addEventListener('message', handleMessage);
      
        // // Clean up the listener when the component unmounts
        // return () => {
        //   window.removeEventListener('message', handleMessage);
        // };
      }, []);

    return (
        <div className="profile-page">
            <LoadingScreen loading={loading}/>
            {/* <iframe onLoad={() => tryLogin()} title='Sbop-Sistema' id='flask_iframe' src={'https://sistema.sbop.com.br:5001/home/'} width={'100%'} height={"100%"} seamless allow='clipboard-write' allow-same-origin="true" allow-cross-origin="true" /> */}
            <div className="main-container">
                <Toolbar />
                <div className="content-container">
                    <Routes>
                        <Route index element={<DadosCadastrais />} />
                        <Route path='/seguranca' element={<Seguranca />} />
                        <Route path='/planos' element={<Planos />} />
                        <Route path='/conteudos/*' element={<AcessoRestrito />} />
                        <Route path='/solicitacoes' element={<Solicitacoes />} />
                        <Route path='/adm' element={<AdmPanel />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}