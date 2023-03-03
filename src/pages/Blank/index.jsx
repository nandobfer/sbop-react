import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './style.scss';

export const Blank = () => {

    const params = useParams()

    useEffect(() => {
        window.addEventListener('message', (event) => {
            if (event.data === 'refresh') {
              window.location.reload();
            }
        });
    }, [])
    
    return (
        <div className='Blank-Page' >
            <iframe title='Sbop-Sistema' src={`https://sistema.sbop.com.br:5001/${params.cpf ? `home?cpf=${params.cpf}` : null}`} width={'100%'} seamless/>
        </div>
    )
}