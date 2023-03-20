import { useEffect } from "react"
import { useState } from "react"
import COLORS from '../../../sass/_colors.scss'

export const MemberContainer = ({ member, currentMember, setCurrentMember }) => {
    const [current, setCurrent] = useState(false)

    const style = {
        border: `0.25vw solid ${current ? COLORS.primary : COLORS.background}`
    }

    useEffect(() => {
        setCurrent(currentMember?.id == member.id)

    }, [currentMember])

    return (
        <div className="member-container" onClick={() => setCurrentMember(member)} style={style}>
            {member.nome}
        </div>
    )
}