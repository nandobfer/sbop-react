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


export const Temporario = () => {

    const Stage = ({ stage }) => {

        return (
            <section>
                <div className="stages">
                    <div className="number">
                        <h1>{stage.id}</h1>
                    </div>
                    <h1>{stage.title}</h1>
                    <p>{stage.description}</p>
                    { currentStage == stage.id ? <button onClick={() => navigate(stage.location)} >Prosseguir</button> : stage.condition ? <CheckCircleIcon sx={{color: 'green'}} /> : <RemoveCircleIcon /> }
                </div>
                { stage.id == 3 ? null : <hr /> }
            </section>
        )
    }

    const params = useParams()
    const [membro, setMembro] = useMembro()
    const stages = useTemporaryStages(membro)
    const navigate = useNavigate()

    const [currentStage, setCurrentStage] = useCurrentStage()

    

    useEffect(() => {
        api.post('/member', {id: params.id})
        .then(({data}) => {
            setMembro(data)
        })
    }, [])
    
    return (
        <div className='Temporario-Page' >
                {stages.map(stage => <Stage key={stage.id} stage={stage} />)}
        </div>
    )
}