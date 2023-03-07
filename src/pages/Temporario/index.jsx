import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api';
import { useMembro } from '../../hooks/useMembro';
import { useTemporaryStages } from '../../hooks/useTemporaryStages';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import './style.scss';
import { useCurrentStage } from '../../hooks/useCurrentStage';
import { Resignup } from './Resignup';
import { useSpecializations } from '../../hooks/useSpecializations';
import { NewPassword } from './NewPassword';
import COLORS from '../../sass/_colors.scss'


export const Temporario = () => {

    const Stage = ({ stage }) => {

        return (
            <section>
                <div className="stages">
                    <div className="number">
                        <h1>{stage.id}</h1>
                    </div>
                    <h1 className='stage-title'>{stage.title}</h1>
                    <p className='stage-description'>{stage.description}</p>
                    { stage.condition ? <CheckCircleIcon sx={{color: COLORS['check_green']}} /> : currentStage == stage.id ? <button className='default-button temp-forward-button' onClick={() => navigate(stage.location)} >Prosseguir</button> : <RemoveCircleIcon /> }
                    { stage.condition ? <p className='link' onClick={() => navigate(stage.location)}>Editar</p> : null }
                </div>
                { stage.id == 3 ? null : <hr /> }
            </section>
        )
    }

    const params = useParams()
    const [membro, setMembro] = useMembro()
    const [specializations, setSpecializations] = useSpecializations()
    const stages = useTemporaryStages(membro)
    const navigate = useNavigate()

    const [currentStage, setCurrentStage] = useCurrentStage()

    const [newPassword, setNewPassword] = useState(false)

    useEffect(() => {
        setCurrentStage(membro.recadastrado ? membro.pago ? 3 : 2 : 1)
    }, [membro])

    useEffect(() => {
        if (!membro.nome) {
            api.post('/member', {id: params.id})
            .then(({data}) => {
                setMembro({...data, recadastrado: false})
                setNewPassword(data.primeiro_acesso)
            })
        }

        if (specializations.length == 0) {
            api.get('/get_specializations')
            .then(({data}) => {
                setSpecializations(data)
            })
        }

    }, [])
    
    return (
        <div className='Temporario-Page' style={{opacity: newPassword ? 0.6 : null}} >
            <NewPassword open={newPassword} setOpen={setNewPassword} />
            {stages.map(stage => <Stage key={stage.id} stage={stage} />)}
        </div>
    )
}