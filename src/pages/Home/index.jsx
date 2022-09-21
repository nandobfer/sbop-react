import { Input } from '../../components/Input';
import './style.scss';
import { Form } from '../../components/Form';

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

    const onFormSubmit = (values) => {
        console.log(values);
        alert(JSON.stringify(values, null, 2));
    }

    const inputs = {
        input_login: '',
        input_senha: '',
    }

    return (
        <section className="home-page">
            <div className="background-container">
                <img src="/images/logo.png" alt="Logo" />
                <div className="main-container">
                    <div className="titles">
                        <h1>Login</h1>
                        <hr />
                        <h1>Cadastro</h1>
                    </div>
                    <p>Bem vindo! Por favor preencha os campos de nome de usuário e senhas para acessar sua conta.</p>
                    <Form initialValues={inputs} onSubmit={values => onFormSubmit(values)}>
                        <Input 
                            mask={() => false}
                            id='input_login'
                            placeholder='Nome de usuário, e-mail ou CPF'
                        />
                        <Input 
                            mask={() => false}
                            id='input_senha'
                            placeholder='Senha'
                        />
                        <button type="submit">Entrar</button>
                    </Form>
                </div>
            </div>
        </section>
    )
}

export default Home