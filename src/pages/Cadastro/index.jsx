import { useEffect } from 'react';
import { useState } from 'react';
import { Form, Input } from 'react-burgos';
import { api } from '../../api';
import { DropdownUFS } from '../../components/DropdownUFS';
import { Modal } from '../../components/Modal';
import './style.scss';

export const Cadastro = () => {

    const [feedback, setFeedback] = useState('')
    const [cpf, setCpf] = useState('')
    const [showModal, setShowModal] = useState(false)
    
    const inputs = {
        name: '',
        crm: '',
        uf: 'AC',
        cpf: '',
        email: ''
    }

    const cpf_mask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]

    const onFormSubmit = (values) => {
        const data = values
        data.cpf = values.cpf.replaceAll('.', '').replaceAll('-', '')
        setFeedback('Verificando')
        setShowModal(true)

        api.post('/signup', data)
        .then(response => {
            if (response.data.error) {
                setFeedback(response.data.error)

            } else {
                setFeedback(response.data.message ? 'Usuário já existe, informações atualizadas' : `Novo usuário registrado com sucesso.`)
            }

            setCpf(data.cpf)
        })
    }

    useEffect(() => {
        document.title = 'Formulário de Intenção'
    }, [])

    return (
        <div className='Cadastro-Page' >
            <Modal show={showModal} setShow={setShowModal} >
                <p className='feedback'>{feedback}</p>
                {cpf ? (<div style={{display: 'flex', flexDirection: 'column', gap: '1vw', alignItems: 'center'}}>
                    <p>Para acesso use: Login: {cpf}</p><p>Senha temporária: {cpf}</p>
                </div>) : null}
                <button style={{width: '5vw'}} className='default-button' onClick={() => {setShowModal(false); setCpf('')}}>OK</button>
            </Modal>
            <Form initialValues={inputs} onSubmit={values => onFormSubmit(values)} >
                <div className="form-container">
                    <label htmlFor="name">Nome Completo</label>
                    <Input type="text" id='name' className='default-input' placeholder='Nome Completo' required />

                    <div className="crm-uf-container">
                        <div className="input-container">
                            <label htmlFor="crm">CRM</label>
                            <Input type="number" id='crm' className='default-input' placeholder='CRM' required />
                        </div>

                        <DropdownUFS />
                    </div>

                    <label htmlFor="cpf">CPF</label>
                    <Input type="text" mask={cpf_mask} id='cpf' className='default-input' placeholder='CPF' required />

                    <label htmlFor="email">E-mail</label>
                    <Input type="text" id='email' className='default-input' placeholder='E-mail' required />

                    <div className="button-container">
                        <button type="submit" className='default-button'>Enviar</button>
                    </div>
                </div>
            </Form>
        </div>
    )
}