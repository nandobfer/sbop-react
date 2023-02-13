import { useEffect } from 'react';
import { useState } from 'react';
import { Form, Input } from 'react-burgos';
import { useMediaQuery } from 'react-responsive';
import { api } from '../../api';
import { DropdownUFS } from '../../components/DropdownUFS';
import { Modal } from '../../components/Modal';
import './style.scss';

export const Cadastro = () => {

    const [feedback, setFeedback] = useState('')
    const [cpf, setCpf] = useState('')
    const [showModal, setShowModal] = useState(false)

    const isMobile = useMediaQuery({maxWidth:600})
    
    const inputs = {
        name: '',
        crm: '',
        uf: 'AC',
        cpf: '',
        email: ''
    }

    const data_style = {
        alignItems: isMobile ? 'flex-start' : 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? '4vw' : '1.25vw'
    }

    const button_style = {
        height: 'fit-content',
        width: isMobile ? '60vw' : '15vw', 
        fontSize: isMobile ? '5vw' : '1.25vw',
        marginTop: isMobile ? '3vw' : '0.5vw',
        padding: isMobile ? '2vw' : '0.5vw'
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

    const login = () => {
        setShowModal(false); 
        setCpf('');
        window.location.href = `http://sistema.sbop.com.br:5001/home?cpf=${cpf}`
    }

    useEffect(() => {
        document.title = 'Sbop - Formulário de Intenção'
        
    }, [])

    return (
        <div className='Cadastro-Page' >
            <Modal show={showModal} setShow={setShowModal} isMobile={isMobile} >
                    <p className='feedback'>{feedback}</p>
                    {cpf ? (
                    <div style={data_style}>
                        <p>Para acesso, use:</p>
                        <p><b style={{color: 'black'}}>Login: </b>{isMobile ? <br/> : null}{cpf}</p>
                        <p><b style={{color: 'black'}}>Senha temporária: </b>{isMobile ? <br/> : null}{cpf}</p>
                    </div>
                    ) : null}
                    <button style={button_style} className='default-button' onClick={login}>Faça login agora</button>
            </Modal>
            <Form initialValues={inputs} onSubmit={values => onFormSubmit(values)} >
                <div className="form-container">
                    <div className="top-container">
                        <div className="input-container name-container">
                            <label htmlFor="name">Nome Completo</label>
                            <Input type="text" id='name' className='default-input' placeholder='Nome Completo' required />
                        </div>
                        <img className="logo-blue" src="images/logo_blue.webp" alt="" />
                    </div>

                    <div className="crm-uf-container">
                        <div className="input-container">
                            <label htmlFor="crm">CRM</label>
                            <Input type="number" id='crm' className='default-input' placeholder='CRM' required />
                        </div>

                        <DropdownUFS />
                    </div>

                    <div className="input-container">
                        <label htmlFor="cpf">CPF</label>
                        <Input type="text" mask={cpf_mask} id='cpf' className='default-input' placeholder='CPF' required />
                    </div>

                    <div className="input-container">
                        <label htmlFor="email">E-mail</label>
                        <Input type="email" id='email' className='default-input' placeholder='E-mail' required />
                    </div>

                    <div className="button-container">
                        <button type="submit" className='default-button'>Enviar</button>
                    </div>
                </div>
            </Form>
        </div>
    )
}