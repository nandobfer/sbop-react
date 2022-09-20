import Input from '../../Components/Input';
import './style.scss';
import Form from '../../Components/Form';

const Home = () => {

    const mask = [/\d/, /\d/, /\d/, ".", /\d/, /\d/];
    const test = (values) => {
        console.log(values);
        alert(JSON.stringify(values, null, 2));
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
                    <Form initialValues={{test:''}} onSubmit={values => test(values)}>
                        <Input 
                            // mask={mask}
                            id='test'
                            placeholder='cu'
                        />
                    </Form>
                </div>
            </div>
        </section>
    )
}

export default Home