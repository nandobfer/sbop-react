import { Formik, Form } from 'formik'
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { InputMui } from '../../../components/InputMui';
import './style.scss';

export const MemberPanel = ({ member }) => {

    const [initialValues, setInitialValues] = useState({})

    const onSubmit = values => {
        alert(JSON.stringify(values, null, 4))
    }

    useEffect(() => {
       console.log(member)
        if (member) {
            setInitialValues(member)
        }
    }, [member])

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize >
            {({values, handleChange}) => (
                <Form className='MemberPanel-Component'>
                    <InputMui title={'Nome Completo'} id='nome' value={values.nome || ''} handleChange={handleChange} />
                    <InputMui title={'Nome de usuário'} id='user' value={values.user || ''} handleChange={handleChange} />
                    <InputMui title={'CPF'} id='cpf' value={values.cpf || ''} handleChange={handleChange} />
                    <InputMui title={'Senha'} id='senha' value={values.senha || ''} handleChange={handleChange} />
                    <InputMui title={'Telefone'} id='telefone' value={values.telefone || ''} handleChange={handleChange} />
                    <InputMui title={'Celular'} id='celular' value={values.celular || ''} handleChange={handleChange} />
                    <InputMui title={'Endereço'} id='endereco' value={values.endereco || ''} handleChange={handleChange} />
                    <InputMui title={'CEP'} id='cep' value={values.cep || ''} handleChange={handleChange} />
                    <InputMui title={'Número'} id='numero' value={values.numero || ''} handleChange={handleChange} />
                    <InputMui title={'Complemento'} id='complemento' value={values.complemento || ''} handleChange={handleChange} />
                    <InputMui title={'Bairro'} id='bairro' value={values.bairro || ''} handleChange={handleChange} />
                    <InputMui title={'Cidade'} id='cidade' value={values.cidade || ''} handleChange={handleChange} />

                    <button type="submit">Enviar</button>
                </Form>
            )}
        </Formik>
    )
}