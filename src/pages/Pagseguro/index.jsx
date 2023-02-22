import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../api';
import './style.scss';

export const Pagseguro = () => {

    const params = useParams()

    const [member, setMember] = useState({})

    useEffect(() => {
        console.log(member)
    }, [member])

    useEffect(() => {
        api.post('/login/pagseguro', {id: params.id})
        .then(response => {
            setMember(response.data[0])
        })
    }, [])
    
    return (
        <div className='Pagseguro-Page' >
            {/* <p>{member?.nome}</p> */}
            <div class="payment-body">
                <div className="texts-column">
                    <h2>Pagamento via Pix</h2>
                    <button id="clipboard-button">Clique aqui para copiar a chave Pix</button>
                    <div class="receipt-notice">
                        <p>Envie o comprovante para:</p>
                        <p><b>sbopmail@gmail.com</b></p>
                    </div>
                </div>
                <div className="qr-column">
                    <img class="qrc" src="/images/qrcodesbop.png" alt="" />
                </div>
            </div>
        </div>
    )
}