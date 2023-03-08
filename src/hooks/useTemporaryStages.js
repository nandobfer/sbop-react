import { api } from "../api"

export const useTemporaryStages = (membro) => {
    
    const stages = [
        {
            id: 1, 
            title: "Cadastrar",
            description: "Complete seu perfil para desbloquear as funcionalidades do sistema.",
            location: `/recadastro`,
            condition: membro.recadastrado,
        },
        {
            id: 2, 
            title: "Plano",
            description: "Selecione o plano desejado.",
            location: '/planos',
            condition: membro.pago,
        },
        {
            id: 3, 
            title: "Finalizar",
            description: "Clique para finalizar.",
            location: '/logout',
            condition: !membro.temporario,
        },
    ]

    return stages
}