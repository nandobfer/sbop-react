import { InputMui } from '../InputMui';
import { Formik, Form } from 'formik'
import './style.scss';
import { CircularProgress, MenuItem, Skeleton } from '@mui/material';
import DataTable from 'react-data-table-component';
import { useEffect } from 'react';
import { useState } from 'react';
import { api } from '../../api';
import { useMembro } from '../../hooks/useMembro';
import { useCallback } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import COLORS from '../../sass/_colors.scss'
import { MuiLoading } from '../MuiLoading';
import { Link } from 'react-router-dom';

export const Solicitacoes = ({  }) => {

    const DownloadComponent = ({ solicitacao }) => {
        const onClick = () => {
            console.log(solicitacao)
        }

        return (
            <Link to={`/documents/${member.id}/${solicitacao.URL}`} target="_blank" download>
                <DownloadIcon onClick={onClick} sx={{width: '2.5vw', height: 'auto', color: COLORS.line, cursor: 'pointer'}} />
            </Link>
            
        )
    }

    const CanceledComponent = ({ solicitacao }) => {
        const onClick = () => {
            console.log(solicitacao)
        }

        return (
            <DoDisturbIcon onClick={onClick} sx={{width: '2vw', height: 'auto', color: COLORS.line, cursor: 'not-allowed'}} />
        )
    }

    const CancelComponent = ({ solicitacao }) => {
        const [canceling, setCanceling] = useState(false)

        const onClick = () => {
            setCanceling(true)
            api.post('/member/requests/cancel', {id: solicitacao.ID})
            .then(response => getRequests())
            .catch(error => console.error(error))
            .finally(() => setCanceling(false))
        }

        return (
            <div className="action-container">
                {canceling ? <MuiLoading color={'primary'} /> : <DeleteForeverIcon onClick={onClick} sx={{width: '2.5vw', height: 'auto', color: COLORS.red, cursor: 'pointer'}} />}
            </div>
        )
    }

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
    const [generatingNewRequest, setGeneratingNewRequest] = useState(false)

    const getRequests = useCallback(() => {
        setLoading(true)

        api.post('/member/requests', {id: member.id})
        .then(response => setRequests(response.data))
        .catch(error => console.error(error))
        .finally(() => setLoading(false))
    }, [member])
    
    const onSubmit = (values) => {
        setGeneratingNewRequest(true)
        api.post('/member/requests/new', {member, request_id: values.new_request})
        .then(response => getRequests())
        .catch(error => console.error(error))
        .finally(() => setGeneratingNewRequest(false))

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
            selector: row => row.SITUACAO == 'Concluído' ? <DownloadComponent solicitacao={row} /> : row.SITUACAO == 'Cancelado' ? <CanceledComponent solicitacao={row} /> : <CancelComponent solicitacao={row} />,
            sortable: true,
			width:'6.4vw',
			// cell: row => StatusIcon(row.status),

        },
    ]

    useEffect(() => {
       console.log(requests)
    }, [requests])

    useEffect(() => {
        getRequests()

    }, [])

    return (
        <div className={`solicitacoes-container`}>
            <Formik initialValues={{new_request: 0}} onSubmit={onSubmit} >
                {({values, handleChange}) => (
                    <Form>
                        <InputMui select id='new_request' title='Nova solicitação' handleChange={handleChange} value={values.new_request} >
                            <MenuItem
                                value={0}
                                style={{width: '100%'}}
                            >Certificado de Membro</MenuItem>
                        </InputMui>
                        <button type='submit' className="default-button">{generatingNewRequest ? <MuiLoading /> : 'Incluir Solicitação' }</button>
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