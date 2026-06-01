export const MockData = {
    usuarioLogado: {
        id: "morador-001",
        nome: "Breno Lui",
        apartamento: "10",
        email: "breno@email.com",
        role: "morador"
    },

    condominio: {
        nome: "LBF Condominio",
        cnpj: "12.345.678/0001-90",
        banco: "Banco Exemplo",
        agencia: "1234",
        conta: "98765-4",
        endereco: "Rua das Palmeiras, 100"
    },

    chamados: [
        {
            id: "cha-001",
            titulo: "Vazamento no banheiro",
            descricao: "Ha um vazamento no encanamento do banheiro principal",
            dataAbertura: "25/04/2026",
            status: "aberto",
            morador: {
                nome: "Breno Lui",
                apartamento: "10"
            }
        },
        {
            id: "cha-002",
            titulo: "Luz do corredor queimada",
            descricao: "A lampada do corredor do 3 andar esta queimada",
            dataAbertura: "20/04/2026",
            status: "aberto",
            morador: {
                nome: "Breno Lui",
                apartamento: "10"
            }
        },
        {
            id: "cha-003",
            titulo: "Portao da garagem com defeito",
            descricao: "O portao automatico nao esta abrindo corretamente",
            dataAbertura: "18/04/2026",
            status: "aberto",
            morador: {
                nome: "Maria Santos",
                apartamento: "102"
            }
        },
        {
            id: "cha-004",
            titulo: "Interfone sem funcionar",
            descricao: "O interfone do apartamento parou de funcionar",
            dataAbertura: "15/04/2026",
            status: "aberto",
            morador: {
                nome: "Ana Oliveira",
                apartamento: "202"
            }
        }
    ],

    pagamentos: [
        {
            id: "pag-2026-04",
            mes: "Abril 2026",
            valor: 850,
            status: "pendente",
            vencimento: "05/05/2026",
            dataPagamento: null,
            boleto: {
                numeroDocumento: "LBF-2026-04-010",
                nossoNumero: "000000123456",
                linhaDigitavel: "34191.79001 01043.510047 91020.150008 8 97370000085000",
                codigoBarras: "34198973700000850001790001043510049102015000",
                instrucoes: [
                    "Nao receber apos 30 dias do vencimento.",
                    "Apos vencimento, cobrar multa de 2% e juros de 1% ao mes.",
                    "Boleto referente a taxa condominial mensal."
                ]
            }
        },
        {
            id: "pag-2026-03",
            mes: "Marco 2026",
            valor: 850,
            status: "pago",
            vencimento: "05/04/2026",
            dataPagamento: "03/04/2026",
            boleto: {
                numeroDocumento: "LBF-2026-03-010",
                nossoNumero: "000000123455",
                linhaDigitavel: "34191.79001 01043.510047 91020.140009 1 97070000085000",
                codigoBarras: "34191970700000850001790001043510049102014000",
                instrucoes: [
                    "Pagamento identificado.",
                    "Documento mantido para consulta do morador."
                ]
            }
        },
        {
            id: "pag-2026-02",
            mes: "Fevereiro 2026",
            valor: 850,
            status: "pago",
            vencimento: "05/03/2026",
            dataPagamento: "02/03/2026",
            boleto: {
                numeroDocumento: "LBF-2026-02-010",
                nossoNumero: "000000123454",
                linhaDigitavel: "34191.79001 01043.510047 91020.130001 4 96760000085000",
                codigoBarras: "34194967600000850001790001043510049102013000",
                instrucoes: [
                    "Pagamento identificado.",
                    "Documento mantido para consulta do morador."
                ]
            }
        },
        {
            id: "pag-2026-01",
            mes: "Janeiro 2026",
            valor: 850,
            status: "pago",
            vencimento: "05/02/2026",
            dataPagamento: "04/02/2026",
            boleto: {
                numeroDocumento: "LBF-2026-01-010",
                nossoNumero: "000000123453",
                linhaDigitavel: "34191.79001 01043.510047 91020.120002 7 96450000085000",
                codigoBarras: "34197964500000850001790001043510049102012000",
                instrucoes: [
                    "Pagamento identificado.",
                    "Documento mantido para consulta do morador."
                ]
            }
        }
    ]
};
