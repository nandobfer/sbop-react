import { borderRadius } from "@mui/system";
import { useEffect } from "react"
import { useState } from "react"
import { SwitchMultiButton } from "switch-multi-button";
import COLORS from '../../../sass/_colors.scss'
import './style.scss';

export const MemberContainer = ({ member, currentMember, setCurrentMember }) => {
    const [current, setCurrent] = useState(false)
    const [plan, setPlan] = useState(member.assinatura || '')

    const style = {
        border: `0.25vw solid ${current ? COLORS.primary : COLORS.background}`
    }

    const plans_style = {
        backgroundColor: 'white',
        outline: `0.25vw solid ${COLORS.background}`,
        borderRadius: '5vw'
    }

    useEffect(() => {
        setCurrent(currentMember?.id == member.id)

    }, [currentMember])

    // useEffect(() => {
    //     setPlan(member.assinatura || 'Aspirante')
    // }, [])

    return (
        <div className="member-container" onClick={() => setCurrentMember(member)} style={style}>
            <div className="photo-container">

            </div>
            <div className="info-container">
                <p>{member.nome}</p>
                <div className="documents-container">
                    <p>CRM: {member.crm}</p>
                    <hr />
                    <p>CPF: {member.cpf}</p>
                </div>
            </div>
            <hr />
            <div className="plans-container">
            <SwitchMultiButton
                style={plans_style}
                value={plan} // set as default button
                setValue={setPlan}
                buttons={[
                {
                    text: '',
                    value: '',
                    props: {style: {display: 'none'}}
                },
                {
                    text: 'Aspirante',
                    value: 'Aspirante',
                },
                {
                    text: 'Associado',
                    value: 'Associado',
                },
                {
                    text: 'Titular',
                    value: 'Titular',
                },
                ]}
            />
            </div>
        </div>
    )
}