import { useEffect } from 'react';
import { useState } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { useParams } from 'react-router-dom';
import { api } from '../../api';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import './style.scss';

export const Pagseguro = () => {

    const params = useParams()

    const [member, setMember] = useState({})
    const [qrCode, setQrCode] = useState({})
    const [socketUrl, setSocketUrl] = useState('ws://127.0.0.1:4001')

    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
        onMessage: (message) => console.log(message)
      })

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
      }[readyState];

    useEffect(() => {
        if (member.nome) {
            console.log(member)
            // new order data
            const data = {
                reference_id: member.id,
                
                customer: {
                    name: member.nome,
                    email: member.email,
                    tax_id: member.cpf,
                },
    
                items: [
                    {
                        name: params.plan,
                        quantity: 1,
                        unit_amount: 1,
                    },
                ],

                shipping: {
                    address: {
                        street: member.endereco,
                        number: member.numero,
                        complement: member.complemento,
                        locality: member.bairro,
                        city: member.cidade,
                        region_code: member.uf,
                        country: "BRA",
                        postal_code: member.cep,
                    }
                },
                
                qr_codes: [
                    {
                        amount: {
                            value: params.plan == 'aspirante' ? '200' : '400'
                        }
                    }
                ],

                notification_urls: [
                    "https://app.agenciaboz.com.br:4000/api/v1/sbop/pagseguro/webhook"
                ]
    
            }

            api.post('/pagseguro/new_order', data)
            .then(response => {
                console.log(response.data)
                setQrCode(response.data.qr_codes[0])
                sendMessage('Hello')
            })
        }
    }, [member])

    useEffect(() => {
        if (qrCode.text) {
        }
    }, [qrCode])

    useEffect(() => {
        api.post('/pagseguro/member', {id: params.id})
        .then(response => {
            setMember(response.data[0])
        })
    }, [])
    
    return (
        <div className='Pagseguro-Page' >
            <span>The WebSocket is currently {connectionStatus}</span>
            <p>{ lastMessage }</p>
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
                {/* <p>{member?.nome}</p>
                <p>{qrCode?.id}</p>
                <p>{qrCode?.text}</p> */}
                <div className="qr-column">
                    {qrCode?.text ? <QRCode value={qrCode.text} size={300} /> : null}
                </div>
            </div>
        </div>
    )
}