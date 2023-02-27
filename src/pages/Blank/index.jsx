import { useEffect } from 'react';
import './style.scss';

export const Blank = () => {

    useEffect(() => {
        window.addEventListener('message', (event) => {
            if (event.data === 'refresh') {
              window.location.reload();
            }
        });
    }, [])
    
    return (
        <div className='Blank-Page' >
            <iframe title='Sbop-Sistema' src='https://sistema.sbop.com.br:5001' width={'100%'} seamless/>
        </div>
    )
}