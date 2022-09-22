import { useState } from 'react';
import { Input } from 'react-burgos';
import { Form } from 'react-burgos';
import { LoadingScreen } from '../../components/LoadingScreen';
import { api } from '../../api'
import './style.scss';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    // const mask = [/\d/, /\d/, /\d/, ".", /\d/, /\d/];

    // const mask2 = (digit) => {
    //     let array = []
    //     for (let char of digit) {
    //         if (char == '@') {
    //             array = ['$', ...digit, /\./]
    //         } else {
    //             array = [...digit, /\./]
    //         }
    //     }
    //     return array
    // }

    const navigate = useNavigate();
    // const [loginfeedback, setLoginfeedback] = useState('');
    const onFormSubmit = (values) => {
        const data = {
            login: values.input_login,
            password: values.input_senha,
        }
        console.log(data);
        setLoading(true);
        api.post('/login', data)
        .then((response) => {
            console.log(response.data);
            if (!!response.data[0]) {
                navigate('/perfil', response.data[0]);
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

    const [loading, setLoading] = useState(false)

    return (
        <section className="home-page">
            <LoadingScreen loading={loading}/>
            <div className="background-container">
                <img src="/images/logo.webp" alt="Logo" />
                <div className="main-container">
                    <div className="titles">
                        <h1>Login</h1>
                        <hr />
                        <h1>Cadastro</h1>
                    </div>
                    <p>Bem vindo! Por favor preencha os campos de nome de usuário e senhas para acessar sua conta.</p>
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
                        />
                        <button className='default-button' type="submit">Entrar</button>
                    </Form>
                    <p>Esqueci minha senha</p>
                </div>
            </div>
        </section>
    )
}

export default Home