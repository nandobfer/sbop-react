import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMembro } from '../../hooks/useMembro';
import { usePlans } from '../../hooks/usePlans';
import './style.scss';
import COLORS from '../../sass/_colors.scss';
import { useMediaQuery } from 'react-responsive'
import { api } from '../../api';

export const Planos = () => {

    const isMobile = useMediaQuery({maxWidth:600})

    const Plan = ({ plan, onClick }) => {
        const [current, setCurrent] = useState(false)
        const [clicked, setClicked] = useState(false)

        useEffect(() => {
            // if (plan.id == 0 && (membro.assinatura == 'Aspirante' || membro.assinatura == '')) {
            if (plan.id == 0 && membro.assinatura != "Titular") {
                
            } else {
                setClicked(clickedPlan.id == plan.id ? true : false)
            }

        }, [clickedPlan])

        useEffect(() => {
            if (membro.assinatura == plan.name) {
                setCurrent(true)
            }
        }, [])

        return (
            <div className="plan-container" onClick={onClick} style={{outline: clicked ? ( isMobile ? `1vw solid ${COLORS['check_green']}` : `0.5vw solid ${COLORS['check_green']}` ) : null, cursor: (plan.id == 0 && membro.assinatura != "Titular") ? 'not-allowed' : 'pointer'}}>
                <div className="title-container">
                    <h1>Membro {plan.name}</h1>
                    { current ? <p>Plano atual</p> : null }
                </div>
                <p>{plan.description}</p>
                <p>R$ {plan.value},00/ano.</p>
                {plan.id == 0 ?
                <p style={{color: COLORS.red}}>Necessário envio de documentos</p>
                : null}
            </div>
        )
    }

    const [membro, setMembro] = useMembro()
    const plans = usePlans().filter(plan => plan.id <= (membro.assinatura == 'Titular' ? 0 : membro.assinatura == 'Associado' ? 1 : 2))
    const navigate = useNavigate()
    const params = useParams()

    const [clickedPlan, setClickedPlan] = useState({})

    const goToPagseguro = () => {
        if (!clickedPlan.id && membro.assinatura != 'Titular') {
            alert('selecione um plano')
        } else {
            navigate(`/pagseguro/${membro.id}/${clickedPlan.name.toLowerCase()}`)
        }
            
    }

    useEffect(() => {
        if (!membro.nome) {
            api.post('/member', {id: params.id})
            .then(({data}) => {
                setMembro({...data, recadastrado: false})
            })
        }

    }, [])
    
    return (
        <div className='Planos-Component' >
            <div className="title-wrapper">
                <div className="title">
                    <h1>Escolha seu plano de afiliação</h1>
                    <p>Selecione a opção desejada, clique em continuar, e prossiga com as instruções na próxima página.</p>
                </div>
                <div className="warning-container" style={{backgroundColor: membro.pago ? COLORS.check_green : COLORS.red}}>
                    { membro.pago ?
                    <p>Vigente até dia 31/12/2023</p>
                    :
                    <p>Pagamento do dia 31/12/2022 pendente!</p>
                    }
                </div>
            </div>
            <div className="plans-container">
                {plans.map(plan => <Plan key={plan.id} plan={plan} onClick={() => setClickedPlan(plan)} />)}
            </div>
            <div className="buttons-container">
                {params?.id ? null : <button className='default-button' onClick={() => navigate(-1)} >Voltar</button>}
                <button className='default-button plans-pay-button' onClick={() => goToPagseguro()}>Pagar</button>
            </div>
        </div>
    )
}