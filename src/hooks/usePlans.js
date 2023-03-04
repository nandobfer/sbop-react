export const usePlans = () => {
    const plans = [
        {
            id: 0,
            name: 'Titular',
            value: 400,
            description: 'Divulgação da localidade de atendimento no site com mini-curriculum (dados de responsabilidade do membro); 10% de desconto no seguro responsabilidade civil; desconto nos congressos e jornadas SBOP; acesso ao conteúdo exclusivo no site da SBOP; atualizações de conteúdos da SBOP por meio de fórum e email. R$ 400,00/ano',
        },
        {
            id: 1,
            name: 'Associado',
            value: 400,
            description: '10% de desconto no seguro responsabilidade civil; desconto nos congressos e jornadas SBOP; acesso ao conteúdo exclusivo no site da SBOP; atualizações de conteúdos da SBOP por meio de fórum e e-mail. R$ 400,00/ano',
        },
        {
            id: 2,
            name: 'Aspirante',
            value: 200,
            description: '',
        },
    ]

    return plans
}