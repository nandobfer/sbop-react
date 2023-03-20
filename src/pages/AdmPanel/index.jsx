import { useState } from 'react';
import { InputMui } from '../../components/InputMui';
import { MemberPanel } from './MemberPanel';
import { Formik, Form } from 'formik'
import './style.scss';
import { api } from '../../api';
import { CircularProgress, Skeleton } from '@mui/material';
import { useEffect } from 'react';
import { Snackbar } from '../../components/Snackbar';
import { MemberContainer } from './MemberContainer';

export const AdmPanel = () => {

    const Search = () => {

        const onSubmit = values => {
            setLoading(true)
            setCurrentMember(null)
            
            api.post('/member/search', values)
            .then(response => {
                setMembers(response.data)
            })
            .catch(error => {
                console.error(error)
                setSnackbar('error')
                setSnackbarText(error.message)
            })
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
    const [reload, setReload] = useState(true)

    const [snackbar, setSnackbar] = useState('')
    const [snackbarText, setSnackbarText] = useState('')

    const skeletons = [1, 2, 3, 4]

    useEffect(() => {
        if (reload) {
            setReload(false)
            setLoading(true)
            setCurrentMember(null)

            api.post('/member/search', {name: ''})
            .then(response => {
                setMembers(response.data)
            })
            .catch(error => {
                console.error(error)
                setSnackbar('error')
                setSnackbarText(error.message)
            })
            .finally(() => {
                setLoading(false)
            })
        }
    }, [reload])

    useEffect(() => {

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
                        {members.map(member => <MemberContainer key={member.id} member={member} currentMember={currentMember} setCurrentMember={setCurrentMember} />)}
                    </div>
                }
                <MemberPanel member={currentMember} setReload={setReload} setSnackbar={setSnackbar} setSnackbarText={setSnackbarText} />
            </div>
            <Snackbar text={snackbarText} severity={snackbar} open={Boolean(snackbar)} setOpen={setSnackbar} />
        </div>
    )
}