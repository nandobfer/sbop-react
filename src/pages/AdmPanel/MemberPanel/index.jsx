import { Checkbox, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup } from '@mui/material';
import { Formik, Form } from 'formik'
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { InputMui } from '../../../components/InputMui';
import { useEstadosBrasil } from '../../../hooks/useEstadosBrasil';
import { useSpecializations } from '../../../hooks/useSpecializations';
import { useStripAll } from '../../../hooks/useStripAll';
import './style.scss';

export const MemberPanel = ({ member }) => {

    const estados = useEstadosBrasil()
    const [specializations, setSpecializations] = useSpecializations()
    const stripAll = useStripAll()

    const [initialValues, setInitialValues] = useState({})
    const [checkedSpecializations, setCheckedSpecializations] = useState([])

    const onCheckboxChange = (event, specialization) => {
        if (checkedSpecializations.includes(specialization.nome)) {
            setCheckedSpecializations(checkedSpecializations.filter(item => item != specialization.nome))
        } else {
            setCheckedSpecializations([...checkedSpecializations, specialization.nome])
        }
    }

    const onSubmit = values => {
        // REMOVE UNREGISTERED SPECIALIZATIONS ===============
        const stringfiedSpecializations = specializations.map(specialization => specialization.nome)

        checkedSpecializations.map(item => {
            if (!stringfiedSpecializations.includes(item)) {
                setCheckedSpecializations(checkedSpecializations.filter(_item => _item != item))
            }
        })
        // ===================================================

        values.id = member.id
        values.especialidades = checkedSpecializations
        values.crm = values.crm+'-'+values.crm_uf
        values.cpf = stripAll(values.cpf)
        values.telefone = stripAll(values.telefone)
        values.cep = stripAll(values.cep)

        console.log({values})
    }

    useEffect(() => {
       console.log(member)
        if (member) {
            setInitialValues({...member, crm_uf: member?.crm?.split('-')[1]})
            setCheckedSpecializations(member.especialidades)
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

                        <FormLabel id="pessoa">Pessoa</FormLabel>
                        <RadioGroup
                            aria-labelledby="pessoa"
                            name="pessoa"
                            value={values.pessoa || ''}
                            onChange={handleChange}
                            row
                        >
                            <FormControlLabel value="Física" control={<Radio />} label="Física" />
                            <FormControlLabel value="Jurídica" control={<Radio />} label="Jurídica" />
                        </RadioGroup>

                        <FormLabel id="especialidades">Especialidades</FormLabel>
                        <div className="specializations-container">
                            {specializations.map(specialization => {
                                return (
                                    <FormControlLabel key={specialization.nome} control={<Checkbox checked={checkedSpecializations?.includes(specialization.nome) ? true : false} onChange={(event) => onCheckboxChange(event, specialization)} />} label={specialization.nome} />
                                )
                            })}
                        </div>

                        <FormLabel id="system-info">Informações do sistema</FormLabel>
                        <FormControlLabel control={<Checkbox name='temporario' checked={!!values.temporario} onChange={handleChange} />} label={'Temporário'} />
                        <FormControlLabel control={<Checkbox name='primeiro_acesso' checked={!!values.primeiro_acesso} onChange={handleChange} />} label={'Primeiro acesso'} />
                        <FormControlLabel control={<Checkbox name='pago' checked={!!values.pago} onChange={handleChange} />} label={'Pago'} />

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