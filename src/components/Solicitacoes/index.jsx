import { InputMui } from '../InputMui';
import { Formik, Form } from 'formik'
import './style.scss';
import { MenuItem, Skeleton } from '@mui/material';
import DataTable from 'react-data-table-component';
import { useEffect } from 'react';
import { useState } from 'react';
import { api } from '../../api';
import { useMembro } from '../../hooks/useMembro';

export const Solicitacoes = ({  }) => {

    const RowSkeleton = () => {
        return (
            <div className="skeleton" >
                <Skeleton animation="wave" variant="rounded" width={'100%'} height={'3vw'} />
            </div>
        )
    }

    const [member, setMember] = useMembro()

    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(false)
    
    const onSubmit = (values) => {
        alert(JSON.stringify(values, null, 4))
    }

    const tableOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'todos',
        
    }

    const columns = [
        {
            name: 'Protocolo',
            selector: row => row.PROTOCOLO,
            sortable: true,
        },
        {
            name: 'Solicitação',
            selector: row => row.SOLICITACAO,
            sortable: true,
            width: '30vw'
        },
        {
            name: 'Situação',
            selector: row => row.SITUACAO,
            sortable: true,
            // format: row => formatCPF(row.cpf)
        },
        {
            name: 'Data',
            selector: row => row.DATA,
            sortable: true,
			// format: row => formatDate(row.data_entrada, row.hora_entrada)
        },
		{
            name: 'Ação',
            selector: row => row.status,
            sortable: true,
			width:'6.4vw',
			// cell: row => StatusIcon(row.status),

        },
    ]

    useEffect(() => {
       console.log(requests)
    }, [requests])

    useEffect(() => {
        setLoading(true)
        api.post('/member/requests', {id: member.id})
        .then(response => setRequests(response.data))
        .catch(error => console.error(error))
        .finally(() => setLoading(false))

    }, [])

    return (
        <div className={`solicitacoes-container`}>
            <Formik initialValues={{new_request: 1}} onSubmit={onSubmit} >
                {({values, handleChange}) => (
                    <Form>
                        <InputMui select id='new_request' title='Selecione a solicitação' handleChange={handleChange} value={values.new_request} >
                            <MenuItem
                                value={1}
                                style={{width: '100%'}}
                            >Certificado de Membro</MenuItem>
                        </InputMui>
                        <button className="default-button">Incluir Solicitação</button>
                    </Form>
                )}
            </Formik>

            <div className="requests-history">
                <h1>Histórico de solicitações</h1>
                {loading ? [1, 2, 3, 4, 5].map(skeleton => <RowSkeleton key={skeleton} />)
                : <DataTable 
                    pagination
                    paginationComponentOptions={tableOptions}
                    highlightOnHover
			        fixedHeader
                    columns={columns}
                    data={requests}
                />}
            </div>
        </div>
    )
}