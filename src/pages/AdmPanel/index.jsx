import { useState } from 'react';
import { InputMui } from '../../components/InputMui';
import { MemberPanel } from './MemberPanel';
import { Formik, Form } from 'formik'
import './style.scss';
import { api } from '../../api';
import { CircularProgress, Skeleton } from '@mui/material';
import { useEffect } from 'react';

export const AdmPanel = () => {

    const Search = () => {

        const onSubmit = values => {
            setLoading(true)
            setCurrentMember(null)
            
            api.post('/member/search', values)
            .then(response => {
                setMembers(response.data)
            })
            .catch(error => console.error(error))
            .finally(() => setLoading(false))
        }

        return (
            <Formik initialValues={{name: ''}} onSubmit={onSubmit} >
                {({values, handleChange}) => (
                    <Form>
                        <InputMui title={'Pesquisar membros'} id='name' required={false} width={'100%'} value={values.name} handleChange={handleChange} />
                    </Form>
                )}
            </Formik>
        )
    }

    const MemberContainer = ({ member }) => {
        return (
            <div className="member-container" onClick={() => setCurrentMember(member)}>
                {member.nome}
            </div>
        )
    }

    const SkeletonMember = () => {
        return (
            <div className="skeleton">
                <Skeleton animation="wave" variant="circular" width={'5vw'} height={'5vw'} />
                <Skeleton animation="wave" variant="rounded" width={'100%'} height={'5vw'} />
            </div>
        )
    }

    const [members, setMembers] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentMember, setCurrentMember] = useState(null)

    const skeletons = [1, 2, 3, 4]

    useEffect(() => {
        setCurrentMember(null)

        api.post('/member/search', {name: ''})
        .then(response => {
            setMembers(response.data)
        })
        .catch(error => console.error(error))
        .finally(() => {
            setLoading(false)
        })

    }, [])
    
    return (
        <div className='AdmPanel-Page' >
            <div className="top-container">
                <h2>Icone</h2>
                <div className="search-container">
                    <Search />
                </div>
            </div>
            <div className="panel-container">
                {
                    loading ?
                    <div className="results-container">
                        {skeletons.map((key) => <SkeletonMember key={key} />)}
                    </div>
                    :
                    <div className="results-container">
                        {members.map(member => <MemberContainer key={member.id} member={member} />)}
                    </div>
                }
                {currentMember && <MemberPanel member={currentMember} loading={loading} />}
            </div>
        </div>
    )
}