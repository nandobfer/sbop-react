import './style.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Formik, Form } from 'formik'
import { InputMui } from '../../components/InputMui';
import { useNavigate } from 'react-router-dom';
import COLORS from '../../sass/_colors.scss'
import { useState } from 'react';
import { PostContainer } from './PostContainer';
 
export const AdmPosts = ({ setSnackbar, setSnackbarText }) => {

    const Search = () => {

        const onSubmit = values => {
            setLoading(true)
            // setCurrentMember(null)
            
            // api.post('/member/search', values)
            // .then(response => {
            //     setMembers(response.data)
            // })
            // .catch(error => {
            //     console.error(error)
            //     setSnackbar('error')
            //     setSnackbarText(error.message)
            // })
            // .finally(() => setLoading(false))
        }

        return (
            <Formik initialValues={{name: ''}} onSubmit={onSubmit} >
                {({values, handleChange}) => (
                    <Form>
                        <InputMui title={'Pesquisar posts'} id='name' required={false} width={'100%'} value={values.name} handleChange={handleChange} />
                    </Form>
                )}
            </Formik>
        )
    }

    const getPosts = values => {

    }

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    
    return (
        <div className='AdmPosts-Component' >
            <div className="top-container">
                <ArrowBackIcon sx={{width: '5vw', height: 'auto', color: COLORS.line, cursor: 'pointer'}} onClick={() => navigate('/perfil/adm')} />
                <h2>Icone</h2>
                <div className="search-container">
                    <Search />
                </div>
            </div>
            <div className="posts-container">
                <PostContainer />
            </div>
        </div>
    )
}