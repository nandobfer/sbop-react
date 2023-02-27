import { useEffect } from 'react';
import { useState } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { useParams } from 'react-router-dom';
import { api } from '../../api';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import ReactLoading from 'react-loading';
import './style.scss';
import COLORS from '../../sass/_colors.scss'

export const Pagseguro = () => {
    const fixed_qrcode = true
    const fixed_values = {
        'aspirante': '00020126920014BR.GOV.BCB.PIX0114650851360001970252Pagamento referente a anuidade como membro aspirante5204000053039865406200.005802BR5904SBOP6009SAO PAULO622605226efbqxL6fjSRPouvW6fhzT6304D7C9',
        'associado': '00020126990014BR.GOV.BCB.PIX0114650851360001970259Valor referente a anuidade como membro associado e/ou titul5204000053039865406400.005802BR5904SBOP6009SAO PAULO622505218gOyl59TrT3LUh1fuyTln63047347',
        'titular': '00020126990014BR.GOV.BCB.PIX0114650851360001970259Valor referente a anuidade como membro associado e/ou titul5204000053039865406400.005802BR5904SBOP6009SAO PAULO622505218gOyl59TrT3LUh1fuyTln63047347'
    }
    
    const vw = window.innerWidth / 100
    const params = useParams()

    const [loading, setLoading] = useState(true)
    const [member, setMember] = useState({})
    const [qrCode, setQrCode] = useState({})
    const [socketUrl, setSocketUrl] = useState('wss://app.agenciaboz.com.br:4000')

    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
        onMessage: (message) => {
            if (message.data == 'PAID') {
                window.top.location.reload()
            }
        }
      })

    const copyToClipbloard = () => {
        navigator.clipboard.writeText(fixed_qrcode ? fixed_values[params.plan] : qrCode.text)
    }

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
                setLoading(false)
                console.log(response.data)
                setQrCode(response.data.qr_codes[0])
                sendMessage(member.id)
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
        <div className='Pagseguro-Page' style={loading ? {justifyContent: 'center', alignItems: 'center', height: '100vh'} : null} >
            {loading ? <ReactLoading
                        className='loading-animation'
                        type='spinningBubbles'
                        color={COLORS.primary}
                    /> : 

                    <div className="payment-body">
                        <div className="texts-column">
                            <h2>Pagamento via Pix</h2>
                            <p>Valor: R${params.plan == 'aspirante' ? '200' : '400'},00</p>
                            <button id="clipboard-button" onClick={() => copyToClipbloard()}>Clique aqui para copiar a chave Pix</button>
                            <div className="receipt-notice">
                                <p>Envie o comprovante para:</p>
                                <p><b>sbopmail@gmail.com</b></p>
                            </div>
                        </div>
                        {/* <p>{member?.nome}</p>
                        <p>{qrCode?.id}</p>
                        <p>{qrCode?.text}</p> */}
                        <div className="qr-column">
                            {qrCode?.text ? <QRCode value={fixed_qrcode ? fixed_values[params.plan] : qrCode.text} size={29 * vw} /> : null}
                        </div>
                    </div>}
        </div>
    )
}