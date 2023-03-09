import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './style.scss';

export const Blank = () => {

    const params = useParams()
    const url = params.cpf ? `https://sistema.sbop.com.br:5001/home?cpf=${params.cpf}` : 'https://sistema.sbop.com.br:5001'

    useEffect(() => {
        window.addEventListener('message', (event) => {
            if (event.data === 'refresh') {
              window.location.reload();
            }
        });
    }, [])
    
    return (
        <div className='Blank-Page' >
            <iframe title='Sbop-Sistema' src={url} width={'100%'} seamless allow='encrypted-media'/>
        </div>
    )
}