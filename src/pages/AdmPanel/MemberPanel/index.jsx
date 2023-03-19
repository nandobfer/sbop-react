import { MenuItem } from '@mui/material';
import { Formik, Form } from 'formik'
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { InputMui } from '../../../components/InputMui';
import { useEstadosBrasil } from '../../../hooks/useEstadosBrasil';
import './style.scss';

export const MemberPanel = ({ member }) => {

    const estados = useEstadosBrasil()

    const [initialValues, setInitialValues] = useState({})

    const onSubmit = values => {
        alert(JSON.stringify(values, null, 4))
    }

    useEffect(() => {
       console.log(member)
        if (member) {
            setInitialValues({...member, crm_uf: member?.crm?.split('-')[1]})
        }
    }, [member])

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize >
            {({values, handleChange}) => (
                <Form className='MemberPanel-Component'>
                    <div className="inputs-container">
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

                        <InputMui select id='uf' title='Estado' handleChange={handleChange} value={values.uf || 'AC'} >
                            {estados.map(estado => <MenuItem
                                key={estado.value}
                                value={estado.value}
                                style={{width: '100%'}}
                                >{estado.label}</MenuItem>)}
                        </InputMui>

                        <InputMui title={'País'} disabled id='pais' value={values.pais || 'BR'} handleChange={handleChange} />
                        <div className="two-inputs-container">
                            <InputMui mask={"99.999"} id='crm' title='CRM' handleChange={handleChange} value={values?.crm?.split('-')[0] || ''} />
                            <InputMui select id='crm_uf' title='UF' handleChange={handleChange} value={values.crm_uf || 'AC'} >
                                {estados.map(estado => <MenuItem
                                    key={estado.value}
                                    value={estado.value}
                                    style={{width: '100%'}}
                                >{estado.label}</MenuItem>)}
                            </InputMui>
                        </div>
                        
                        <InputMui multiline id='curriculum' title='Curriculum' handleChange={handleChange} value={values.curriculum} />

                    </div>

                    <div className="buttons-container">
                        <button className='default-button' type="submit">Deletar</button>
                        <button className='default-button' type="submit">Cancelar</button>
                        <button className='default-button' type="submit">Enviar</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}