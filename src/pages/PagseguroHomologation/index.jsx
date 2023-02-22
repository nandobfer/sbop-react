import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../../api"

export const PagseguroHomologation = () => {

    const [member, setMember] = useState({})
    const [plano, setPlano] = useState('')
    const navigate = useNavigate()
    const id = 3

    const pagar = () => {
        if (!plano) {
            alert('selecione um plano')
            return
        }
        navigate(`/pagseguro/${id}/${plano}`)
    }

    useEffect(() => {
        api.post('/pagseguro/member', {id})
        .then(response => {
            setMember(response.data[0])
            console.log(response.data[0])
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
                <label htmlFor="aspirante">Aspirante - R$ 200,00</label>
            </div>
            <button style={{width: '20vw'}} onClick={() => pagar()}>PAGAR</button>
        </div>
    )
}