import { useState } from "react"
import { useEffect } from "react"
import { QRCode } from "react-qrcode-logo"
import { useNavigate } from "react-router-dom"
import { api } from "../../api"

export const PagseguroHomologation = () => {

    const [member, setMember] = useState({})
    const [qrCode, setQrCode] = useState({})
    const [order, setOrder] = useState({})
    const [stage, setStage] = useState(0)
    const [charge, setCharge] = useState({})
    const [lastResponse, setLastResponse] = useState('')
    const [plano, setPlano] = useState('')
    const [buttonName, setButtonName] = useState('gerar pedido')
    const navigate = useNavigate()
    const id = 3

    const pagar = () => {

        if (!stage) {
            if (!plano) {
                alert('selecione um plano')
                return
            }
    
            setButtonName('gerando pedido')
            setLastResponse('')
    
            const data = {
                reference_id: member.id,
                
                customer: {
                    name: member.nome,
                    email: member.email,
                    tax_id: member.cpf,
                },
    
                items: [
                    {
                        name: 'associado',
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
                            value: '40000'
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
                setOrder(response.data)
                setButtonName('pagar')
                setStage(1)
                setLastResponse(response.data)
            })

        }

        if (stage == 1) {
            setButtonName('pagando')
            setLastResponse('')
            const options = {
                method: 'POST',
                url: 'https://sandbox.api.pagseguro.com/pix/pay/'+qrCode.id,
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer 2054EB5973684405B0E04001EE29E932'
                },
                data: {status: 'PAID', tx_id: qrCode.id}
              };
              
              api.post('/pagseguro/simulate_payment', options).then(function (response) {
                console.log(response.data);
                setButtonName('Devolver')
                setStage(2)
                setLastResponse(response.data)
            }).catch(function (error) {
                console.error(error);
              });
        }

        if (stage == 2) {
            setButtonName('devolvendo')
            setLastResponse('')

            const options = {
                method: 'GET',
                url: 'https://sandbox.api.pagseguro.com/orders/'+order.id,
                headers: {Authorization: 'Bearer 2054EB5973684405B0E04001EE29E932'}
              };
              
              api.post('/pagseguro/consult', options).then(function (response) {
                console.log(response.data);
                setCharge(response.data.charges[0])
                setLastResponse(response.data)
            }).catch(function (error) {
                console.error(error);
              });

            
        }
        
    }

    useEffect(() => {
        if (charge?.id) {
            setLastResponse('')
            const options = {
                method: 'POST',
                url: `https://sandbox.api.pagseguro.com/charges/${charge.id}/cancel`,
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer 2054EB5973684405B0E04001EE29E932'
                },
                data: {amount: qrCode.amount}
              };
              
              api.post('/pagseguro/refund', options).then(function (response) {
                console.log(response.data);
                setLastResponse(response.data)
                setButtonName('CANCELADO')
        }).catch(function (error) {
                console.error(error);
              });
        }
    }, [charge])

    useEffect(() => {
        api.post('/pagseguro/member', {id})
        .then(response => {
            setMember(response.data[0])
        })
    }, [])

    const planos_style = {
        gap: '1vw'
    }

    return (
        <div className='PagseguroHomologation-Component' style={{flexDirection: 'column', gap: '1vw', padding: '1vw'}} >
            <p style={{fontWeight: 'bold', marginBottom: '2vw'}}>Esse é um cliente teste para efetuar o pagamento do plano desejado, o sistema consiste em 3 planos: aspirante, associado e titular. Sendo que só associados podem mudar para titular depois que enviarem a documentação para nossa equipe, e não tem diferença de valor. Essa página não reflete o sistema e é apenas para testar e demonstrar o funcionamento do uso da api no sandbox </p>
            <p>nome: {member?.nome}</p>
            <p>cpf: {member?.cpf}</p>
            <p>crm: {member?.crm}</p>
            <p>email: {member?.email}</p>
            <p>celular: {member?.celular}</p>
            <p>endereco: {member?.endereco}</p>
            <p>numero: {member?.numero}</p>
            <p>bairro: {member?.bairro}</p>
            <p>cidade: {member?.cidade}</p>
            <p>estado: {member?.uf}</p>

            <p style={{marginTop: '5vw'}}>selecione o plano</p>

            <div style={planos_style}>
                <input type="radio" name="assinatura" id="associado" onChange={() => setPlano('associado')} />
                <label htmlFor="associado">Associado - R$ 400,00</label>
            </div>

            <div style={planos_style}>
                <input type="radio" name="assinatura" id="aspirante" onChange={() => setPlano('aspirante')} />
                <label htmlFor="aspirante">Aspirante - R$ 400,00</label>
            </div>
            <button style={{width: '20vw'}} onClick={() => pagar()}>{buttonName}</button>
            {qrCode?.text ? <QRCode value={qrCode.text} size={512} /> : null}
            <p>resposta:</p>
            <p>{JSON.stringify(lastResponse)}</p>
        </div>
    )
}