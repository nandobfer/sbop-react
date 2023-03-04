import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMembro } from '../../hooks/useMembro';
import { usePlans } from '../../hooks/usePlans';
import './style.scss';

export const Planos = () => {

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
            <div className="plan-container" onClick={onClick} style={{border: clicked ? '1vw green solid' : null}}>
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
            {plans.map(plan => <Plan key={plan.id} plan={plan} onClick={() => setClickedPlan(plan)} />)}
            <button className='default-button' onClick={() => clickedPlan.id ? navigate(`/pagseguro/${membro.id}/${clickedPlan.name.toLowerCase()}`) : alert('selecione um plano')}>Pagar</button>
        </div>
    )
}