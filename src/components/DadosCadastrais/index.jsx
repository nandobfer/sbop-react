import { useMembro } from '../../hooks/useMembro';
import { MembroDado } from '../MembroDado';
import './style.scss';

export const DadosCadastrais = ({  }) => {

    const [membro, setMembro] = useMembro()
    
    return (
        <div className={`dados-container`}>
            <div className="info-container">
                <div className="foto-container">
                    <img src="/images/doctor_icon.svg" alt="Foto" />
                    <div className="camera-icon-container">
                        <img src="/images/camera.svg" alt="Foto" />
                    </div>
                </div>
                <div className="dados-coluna">
                    <MembroDado title='Nome' value={membro.nome} />
                    <MembroDado title='CRM' value={membro.crm} />
                    <MembroDado title='Contato' value={membro.telefone} />
                    <MembroDado title='Endereço' value={membro.endereco} />
                </div>
                <div className="dados-coluna">
                    <MembroDado title='Nome de usuário' value={membro.user} privado={true} />
                </div>
            </div>
            <hr />
            <div className="curriculum-container">
                <h1 className="title">Curriculum</h1>
                <div className="buttons">
                    <div>
                        <p>Público</p>
                    </div>
                </div>
            </div>
        </div>
    )
}