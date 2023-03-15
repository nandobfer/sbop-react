import { Form, Formik } from 'formik';
import { useState } from 'react';
import { InputMui } from '../InputMui';
import { useMembro } from '../../hooks/useMembro';
import './style.scss';
import { api } from '../../api';

export const Seguranca = ({  }) => {

    const [member, setMember] = useMembro()

    const [passwordError, setPasswordError] = useState(false)
    const [passwordConfirmationError, setPasswordConfirmationError] = useState(false)

    const verifyPassword = (value) => {
        setPasswordError(member.senha == value ? false : value != '' && true)
    }

    const PasswordReset = () => {
        const resetPassword = values => {
            setPasswordConfirmationError(false)

            if (values.password != member.senha) {
                return
            }

            if (values.new_password == values.confirmation) {
                api.post('/update/password', {password: values.new_password, id: member.id})
                .then(response => {
                    alert(response)
                })
            } else {
                setPasswordConfirmationError(true)
            }

        }

        return (
            <Formik initialValues={{password: '', confirmation: '', new_password: ''}} onSubmit={resetPassword} >
                {({values, handleChange, errors}) => (
                    <Form>
                        <InputMui title={'Senha atual'} onBlur={() => verifyPassword(values.password)} type='password' id='password' handleChange={handleChange} value={values.password} error={passwordError} errorText="Senha inválida" />
                        <InputMui title={'Nova senha'} type='password' id='new_password' handleChange={handleChange} value={values.new_password} />
                        <InputMui title={'Confirme nova senha'} type='password' id='confirmation' handleChange={handleChange} value={values.confirmation} error={passwordConfirmationError} errorText="Senhas não conferem" />
                        <button className='default-button' type="submit">Redefinir senha</button>
                    </Form>
                )}
            </Formik>
        )
    }
    
    const EmailReset = () => {
        const resetEmail = values => {
            alert()
        }
        
        return (
            <Formik initialValues={{email: '', confirmation: '', new_email: ''}} onSubmit={resetEmail} >
                {({values, handleChange, errors}) => (
                    <Form>
                        <InputMui title={'E-mail atual'} id='email' handleChange={handleChange} value={values.email} error={Boolean(errors.email)} errorText="e-mail inválido" />
                        <InputMui title={'Novo e-mail'} id='new_email' handleChange={handleChange} value={values.new_email} />
                        <InputMui title={'Confirme novo e-mail'} id='confirmation' handleChange={handleChange} value={values.confirmation} error={Boolean(errors.confirmation)} errorText="E-mails não conferem" />
                        <button className='default-button' type="submit">Redefinir e-mail</button>
                    </Form>
                )}
            </Formik>
        )
    }
    
    return (
        <div className={`seguranca-container`}>
            <div className="form-container">
                <h1>Redefinir senha</h1>
                <PasswordReset />
            </div>
            <div className="form-container">
                <h1>Redefinir e-mail</h1>
                <EmailReset />
            </div>
        </div>
    )
}