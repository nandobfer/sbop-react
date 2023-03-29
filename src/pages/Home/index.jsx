import { useState } from 'react';
import { Input } from 'react-burgos';
import { Form } from 'react-burgos';
import { LoadingScreen } from '../../components/LoadingScreen';
import { api } from '../../api'
import './style.scss';
import { Route, useLocation, useNavigate } from 'react-router-dom';
import { useMembro } from '../../hooks/useMembro';
import { ResetPassword } from './ResetPassword';
import ReactSlideRoutes from 'react-slide-routes';
import { Resignup } from '../Temporario/Resignup';
import COLORS from '../../sass/_colors.scss'
import { useLocalStorage } from '../../hooks/useLocalStorage';
// import { Membro } from '../../contexts/Membro';

const Home = () => {

    const Login = () => {

        const onFormSubmit = (values) => {
            const data = {
                login: values.input_login,
                password: values.input_senha,
            }
            console.log(data);
            setLoading(true);
            api.post('/login', data)
            .then((response) => {
                if (response?.data?.nome) {
                    const member = response.data
                    setMembro(member)
                    storage.set('member', member)
                    navigate(member.adm ? '/perfil/adm' : '/perfil')
    
                }
            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => {
                setLoading(false);
            });
        }
    
        const inputs = {
            input_login: '',
            input_senha: '',
        }

        return (
            <div className='login-container'>
                <p>Bem vindo! Por favor preencha os campos de nome de usuário e senha para acessar sua conta.</p>
                <Form initialValues={inputs} onSubmit={values => onFormSubmit(values)}>
                    <label htmlFor="input_login">Usuário</label>
                    <Input 
                        mask={() => false}
                        id='input_login'
                        placeholder='Usuário, e-mail ou CPF'
                        className='default-input'
                        />
                    <label htmlFor="input_senha">Senha</label>
                    <Input 
                        mask={() => false}
                        id='input_senha'
                        placeholder='Senha'
                        className='default-input'
                        type='password'
                    />
                    <button className='default-button' type="submit">Entrar</button>
                </Form>
                <p onClick={() => setResetPassword(true)}>Esqueci minha senha</p>
            </div>
        )
    }

    const [membro, setMembro] = useMembro()
    const navigate = useNavigate()
    const location = useLocation()
    const storage = useLocalStorage()

    const [loading, setLoading] = useState(false)
    const [resetPassword, setResetPassword] = useState(false)

    // const [loginfeedback, setLoginfeedback] = useState('');
    

    const title_style = {
        color: COLORS.secondary_light, 
        cursor: 'pointer',
    }


    return (
        <section className="home-page">
            <ResetPassword open={resetPassword} setOpen={setResetPassword} />
            <LoadingScreen loading={loading}/>
            
            <div className="background-container">
                <img src="/images/logo.webp" alt="Logo" />
                <div className="main-container">
                    <div className="titles">
                        <h1 style={location.pathname == '/home/cadastro' ? title_style : null} onClick={() => navigate('/home')}>Login</h1>
                        <hr />
                        <h1 style={location.pathname == '/home' ? title_style : null} onClick={() => navigate('/home/cadastro')}>Cadastro</h1>
                    </div>
                    <ReactSlideRoutes location={location} duration={1000}>
                        <Route index element={<Login />} />
                        <Route path='/cadastro' element={<Resignup />} />
                    </ReactSlideRoutes>
                    
                </div>
            </div>
        </section>
    )
}

export default Home