import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMembro } from '../../hooks/useMembro';
import { usePlans } from '../../hooks/usePlans';
import './style.scss';
import COLORS from '../../sass/_colors.scss';
import { useMediaQuery } from 'react-responsive'

export const Planos = () => {

    const isMobile = useMediaQuery({maxWidth:600})

    const Plan = ({ plan, onClick }) => {
        const [current, setCurrent] = useState(false)
        const [clicked, setClicked] = useState(false)

        useEffect(() => {
            if (plan.id == 0 && (membro.assinatura == 'Aspirante' || membro.assinatura == '')) {
                
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
            <div className="plan-container" onClick={onClick} style={{outline: clicked ? ( isMobile ? `1vw solid ${COLORS['check_green']}` : `0.5vw solid ${COLORS['check_green']}` ) : null}}>
                <div className="title-container">
                    <h1>Membro {plan.name}</h1>
                    { current ? <p>Plano atual</p> : null }
                </div>
                <p>{plan.description}</p>
            </div>
        )
    }

    const [membro, setMembro] = useMembro()
    const plans = usePlans().filter(plan => plan.id <= (membro.assinatura == 'Titular' ? 0 : membro.assinatura == 'Associado' ? 1 : 2))
    const navigate = useNavigate()

    const [clickedPlan, setClickedPlan] = useState({})
    
    return (
        <div className='Planos-Component' >
            <div className="plans-container">
                {plans.map(plan => <Plan key={plan.id} plan={plan} onClick={() => setClickedPlan(plan)} />)}
            </div>
            <div className="buttons-container">
                <button className='default-button' onClick={() => navigate(-1)} >Voltar</button>
                <button className='default-button' onClick={() => clickedPlan.id ? navigate(`/pagseguro/${membro.id}/${clickedPlan.name.toLowerCase()}`) : alert('selecione um plano')}>Pagar</button>
            </div>
        </div>
    )
}