import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../api';
import { useMembro } from '../../hooks/useMembro';
import './style.scss';

export const Temporario = () => {

    const params = useParams()
    const [membro, setMembro] = useMembro()

    useEffect(() => {
        api.post('/member', {id: params.id})
        .then(({data}) => {
            setMembro(data[0])
        })
    }, [])
    
    return (
        <div className='Temporario-Page' >
            
        </div>
    )
}