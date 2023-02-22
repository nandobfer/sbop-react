import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../api';
import './style.scss';

export const Pagseguro = () => {

    const params = useParams()

    const [member, setMember] = useState({})

    useEffect(() => {
        console.log(member)
    }, [member])

    useEffect(() => {
        api.post('/login/pagseguro', {id: params.id})
        .then(response => {
            setMember(response.data[0])
        })
    }, [])
    
    return (
        <div className='Pagseguro-Page' >
            <p>{member?.nome}</p>
        </div>
    )
}