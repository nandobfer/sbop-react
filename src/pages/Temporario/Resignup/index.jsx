import { Field, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../../../api"
import { useCurrentStage } from "../../../hooks/useCurrentStage"
import { useMembro } from "../../../hooks/useMembro"
import { useSpecializations } from "../../../hooks/useSpecializations"
import { useStripAll } from "../../../hooks/useStripAll"
import InputMask from 'react-input-mask';
import { Input, TextField } from '@mui/material';
import { InputMui } from "../../../components/InputMui"

export const Resignup = () => {
    
    const stripAll = useStripAll()
    const [membro, setMembro] = useMembro()
    const [specializations, setSpecializations] = useSpecializations()
    const [currentStage, setCurrentStage] = useCurrentStage()
    const [checkedSpecializations, setCheckedSpecializations] = useState([...membro.especialidades])

    const navigate = useNavigate()

    const initialValues = {
        name: membro.nome,
        cpf: membro.cpf,
        email: membro.email,
        crm: membro.crm?.split('-')[0],
        crm_uf: membro.crm?.split('-')[1],
        curriculum: membro.curriculum,
        telefone: membro.telefone,
        cep: membro.cep,
        endereco: membro.endereco,
        numero: membro.numero,
        complemento: membro.complemento,
        bairro: membro.bairro,
        cidade: membro.cidade,
        uf: membro.uf,
    }

    const onCheckboxChange = (event, specialization) => {
        if (checkedSpecializations.includes(specialization.nome)) {
            setCheckedSpecializations(checkedSpecializations.filter(item => item != specialization.nome))
        } else {
            setCheckedSpecializations([...checkedSpecializations, specialization.nome])
        }
    }

    const backButton = (event) => {
        event.preventDefault()
        navigate(-1)
    }

    const onFormSubmit = (values) => {
        // REMOVE UNREGISTERED SPECIALIZATIONS ===============
        const stringfiedSpecializations = specializations.map(specialization => specialization.nome)

        checkedSpecializations.map(item => {
            if (!stringfiedSpecializations.includes(item)) {
                setCheckedSpecializations(checkedSpecializations.filter(_item => _item != item))
            }
        })
        // ===================================================

        values.id = membro.id
        values.especialidades = checkedSpecializations
        values.crm = values.crm+'-'+values.crm_uf
        values.telefone = stripAll(values.telefone)
        values.cep = stripAll(values.cep)
        console.log({values})

        api.post('/signup/full', values)
        .then(({data}) => {
            if (data.changedRows) {
                setMembro({...membro, ...values, recadastrado: true})
                setCurrentStage(2)
                navigate(-1)
            } else {
                console.log({data})
            }
        })
        .catch(error => console.log(error))

    }

    useEffect(() => {
       console.log(checkedSpecializations)
    }, [checkedSpecializations])
    
    return (
        <div className='Resignup-Component' >
            <Formik initialValues={initialValues} onSubmit={values => onFormSubmit(values)} >
                {({handleChange, values}) => (
                    <Form className="form-container" >
                        <div className="left-container input-containers">
                            <InputMui id='name' title='Nome Completo' onChange={handleChange} value={values.name} />

                            <InputMask mask={"999.999.999-99"} alwaysShowMask={false} name="cpf" required onChange={handleChange} value={values.cpf} maskChar={null} >
                                {(inputProps) => <TextField
                                    {...inputProps}
                                    autoFocus
                                    // helperText={passwordError}
                                    // error={!!passwordError || false}
                                    margin="dense"
                                    label="CPF"
                                    fullWidth
                                    variant="standard"
                                />}
                            </InputMask>

                            <InputMui id='email' title='E-mail' onChange={handleChange} value={values.email} />

                            <div className="crm-uf-input">
                                <div className="input-column">
                                    <InputMui mask={"99.999"} id='crm' title='CRM' onChange={handleChange} value={values.crm.split('-')[0]} />
                                </div>
                                <div className="input-column">
                                    <label htmlFor="crm_uf" title="Obrigatório">UF</label>
                                    <Field as="select" name="crm_uf" id="crm_uf" placeholder="UF" required onChange={handleChange} defaultValue={values.crm.split('-')[1]} >
                                        <option value="AC">Acre</option>
                                        <option value="AL">Alagoas</option>
                                        <option value="AP">Amapá</option>
                                        <option value="AM">Amazonas</option>
                                        <option value="BA">Bahia</option>
                                        <option value="CE">Ceará</option>
                                        <option value="DF">Distrito Federal</option>
                                        <option value="ES">Espírito Santo</option>
                                        <option value="GO">Goiás</option>
                                        <option value="MA">Maranhão</option>
                                        <option value="MT">Mato Grosso</option>
                                        <option value="MS">Mato Grosso do Sul</option>
                                        <option value="MG">Minas Gerais</option>
                                        <option value="PA">Pará</option>
                                        <option value="PB">Paraíba</option>
                                        <option value="PR">Paraná</option>
                                        <option value="PE">Pernambuco</option>
                                        <option value="PI">Piauí</option>
                                        <option value="RJ">Rio de Janeiro</option>
                                        <option value="RN">Rio Grande do Norte</option>
                                        <option value="RS">Rio Grande do Sul</option>
                                        <option value="RO">Rondônia</option>
                                        <option value="RR">Roraima</option>
                                        <option value="SC">Santa Catarina</option>
                                        <option value="SP">São Paulo</option>
                                        <option value="SE">Sergipe</option>
                                        <option value="TO">Tocantins</option>
                                    </Field>
                                </div>
                            </div>

                            <p className="temp-skills-p">Especialidades</p>

                            <div className="temp-skills-select">
                                {specializations.map(specialization => {
                                    return (
                                        <div className="specialization-item" key={specialization.id}>
                                            <input type="checkbox" onChange={(event) => onCheckboxChange(event, specialization)} className="checkbox" id={`specialization-${specialization.id}`} name={`specialization-${specialization.id}`} defaultChecked={membro.especialidades.includes(specialization.nome) ? true : false} />
                                            <label htmlFor={`specialization-${specialization.id}`}>{specialization.nome}</label>
                                        </div>
                                    )
                                })}
                            </div>

                            <label htmlFor="curriculum">Curriculum</label>
                            <textarea rows={4} cols={4} name="curriculum" required onChange={handleChange} value={values.curriculum} />
                            <button className="default-button" onClick={(event) => backButton(event)}>Voltar</button>
                        </div>
                        <div className="right-container input-containers">
                            <InputMui mask={"(99) 99999-9999"} id='telefone' title='Telefone' onChange={handleChange} value={values.telefone} />
                            <InputMui mask={"99.999-999"} id='cep' title='CEP' onChange={handleChange} value={values.cep} />
                            <InputMui id='endereco' title='Endereço' onChange={handleChange} value={values.endereco} />
                            <InputMui mask={'99999999'} id='numero' title='Número' onChange={handleChange} value={values.numero} />
                            <InputMui id='complemento' title='Complemento' onChange={handleChange} value={values.complemento} />
                            <InputMui id='bairro' title='Bairro' onChange={handleChange} value={values.bairro} />
                            <InputMui id='cidade' title='Cidade' onChange={handleChange} value={values.cidade} />
                            <label htmlFor="uf">Estado</label>

                            <Field as="select" name="uf" id="uf" placeholder="UF" required onChange={handleChange} defaultValue={values.uf} >
                                <option value="AC">Acre</option>
                                <option value="AL">Alagoas</option>
                                <option value="AP">Amapá</option>
                                <option value="AM">Amazonas</option>
                                <option value="BA">Bahia</option>
                                <option value="CE">Ceará</option>
                                <option value="DF">Distrito Federal</option>
                                <option value="ES">Espírito Santo</option>
                                <option value="GO">Goiás</option>
                                <option value="MA">Maranhão</option>
                                <option value="MT">Mato Grosso</option>
                                <option value="MS">Mato Grosso do Sul</option>
                                <option value="MG">Minas Gerais</option>
                                <option value="PA">Pará</option>
                                <option value="PB">Paraíba</option>
                                <option value="PR">Paraná</option>
                                <option value="PE">Pernambuco</option>
                                <option value="PI">Piauí</option>
                                <option value="RJ">Rio de Janeiro</option>
                                <option value="RN">Rio Grande do Norte</option>
                                <option value="RS">Rio Grande do Sul</option>
                                <option value="RO">Rondônia</option>
                                <option value="RR">Roraima</option>
                                <option value="SC">Santa Catarina</option>
                                <option value="SP">São Paulo</option>
                                <option value="SE">Sergipe</option>
                                <option value="TO">Tocantins</option>
                            </Field>
                            <button className="default-button resignup-submit-button" type="submit">Enviar</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}