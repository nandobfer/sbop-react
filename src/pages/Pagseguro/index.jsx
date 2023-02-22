import { useEffect } from 'react';
import { useState } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { useParams } from 'react-router-dom';
import { api } from '../../api';
import './style.scss';

export const Pagseguro = () => {

    const params = useParams()

    const [member, setMember] = useState({})
    const [qrCode, setQrCode] = useState({})

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
    
            }

            api.post('/pagseguro/new_order', data)
            .then(response => {
                console.log(response.data)
                setQrCode(response.data.qr_codes[0])
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
            <p>{member?.nome}</p>
            <p>{qrCode?.id}</p>
            <p>{qrCode?.text}</p>
            {qrCode?.text ? <QRCode value={qrCode.text} size={512} /> : null}
        </div>
    )
}