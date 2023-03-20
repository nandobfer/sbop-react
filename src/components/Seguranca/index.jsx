import { Form, Formik } from 'formik';
import { useState } from 'react';
import { InputMui } from '../InputMui';
import { useMembro } from '../../hooks/useMembro';
import './style.scss';
import { api } from '../../api';

export const Seguranca = ({  }) => {

    const [member, setMember] = useMembro()
    
    const PasswordReset = () => {

        const [error, setError] = useState(false)
        const [confirmationError, setConfirmationError] = useState(false)
        const [feedback, setFeedback] = useState('')

        const resetPassword = values => {

            setConfirmationError(false)
            setError(false)
            setFeedback('')
            
            if (values.password != member.senha) {
                setError(true)
                return
            }

            if (values.new_password == values.confirmation) {
                api.post('/member/update/password', {password: values.new_password, id: member.id})
                .then(response => {
                    setMember({...member, senha: values.new_password})
                    setFeedback('Senha alterada com sucesso')
                })
            } else {
                setConfirmationError(true)
            }

        }

        return (
            <Formik initialValues={{password: '', confirmation: '', new_password: ''}} onSubmit={values => resetPassword(values)} >
                {({values, handleChange, errors}) => (
                    <Form>
                        <InputMui title={'Senha atual'} type='password' id='password' handleChange={handleChange} value={values.password} error={error} errorText="Senha inválida" />
                        <InputMui title={'Nova senha'} type='password' id='new_password' handleChange={handleChange} value={values.new_password} />
                        <InputMui title={'Confirme nova senha'} type='password' id='confirmation' handleChange={handleChange} value={values.confirmation} error={confirmationError} errorText="Senhas não conferem" />
                        <button className='default-button' type="submit">Redefinir senha</button>
                        <p>{feedback}</p>
                    </Form>
                )}
            </Formik>
        )
    }
    
    const EmailReset = () => {
        const [error, setError] = useState(false)
        const [confirmationError, setConfirmationError] = useState(false)
        const [feedback, setFeedback] = useState('')

        const resetEmail = values => {

            setConfirmationError(false)
            setError(false)
            setFeedback('')
            
            if (values.email != member.email) {
                setError(true)
                return
            }

            if (values.new_email == values.confirmation) {
                api.post('/member/update/email', {id: member.id, email: values.new_email})
                .then(response => {
                    setMember({...member, email: values.new_email})
                    setFeedback('E-mail alterado com sucesso')
                })
            } else {
                setConfirmationError(true)
            }

        }
        
        return (
            <Formik initialValues={{email: '', confirmation: '', new_email: ''}} onSubmit={resetEmail} >
                {({values, handleChange, errors}) => (
                    <Form>
                        <InputMui title={'E-mail atual'} id='email' handleChange={handleChange} value={values.email} error={error} errorText="e-mail inválido" />
                        <InputMui title={'Novo e-mail'} id='new_email' handleChange={handleChange} value={values.new_email} />
                        <InputMui title={'Confirme novo e-mail'} id='confirmation' handleChange={handleChange} value={values.confirmation} error={confirmationError} errorText="E-mails não conferem" />
                        <button className='default-button' type="submit">Redefinir e-mail</button>
                        <p>{feedback}</p>
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