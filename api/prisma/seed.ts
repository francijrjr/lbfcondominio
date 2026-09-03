import 'dotenv/config'
import { PrismaMssql } from '@prisma/adapter-mssql'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '../src/generated/prisma/client.js'

const adapter = new PrismaMssql({
  server: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 1433),
  database: process.env.DB_NAME ?? 'lbf_condominio',
  user: process.env.DB_USER ?? 'sa',
  password: process.env.DB_PASSWORD ?? 'LbfCondo!2026',
  options: {
    encrypt: process.env.DB_ENCRYPT !== 'false',
    trustServerCertificate:
      process.env.DB_TRUST_SERVER_CERTIFICATE !== 'false',
  },
})
const prisma = new PrismaClient({ adapter })

async function main() {
  const passwordHash = await bcrypt.hash('123456', 12)

  const apartment101 = await prisma.apartamento.upsert({
    where: { bloco_numero: { bloco: 'A', numero: '101' } },
    update: {},
    create: { bloco: 'A', numero: '101' },
  })
  const apartment201 = await prisma.apartamento.upsert({
    where: { bloco_numero: { bloco: 'A', numero: '201' } },
    update: {},
    create: { bloco: 'A', numero: '201' },
  })

  const manager = await prisma.pessoa.upsert({
    where: { email: 'sindico@lbf.com.br' },
    update: {},
    create: {
      nome: 'Francis Silva',
      cpf: '11111111111',
      email: 'sindico@lbf.com.br',
      telefone: '85999990001',
      senhaHash: passwordHash,
    },
  })
  await prisma.sindico.upsert({
    where: { pessoaId: manager.id },
    update: {},
    create: { pessoaId: manager.id, inicioMandato: new Date('2026-01-01') },
  })

  const resident = await prisma.pessoa.upsert({
    where: { email: 'morador@lbf.com.br' },
    update: {},
    create: {
      nome: 'Breno Lui',
      cpf: '22222222222',
      email: 'morador@lbf.com.br',
      telefone: '85999990002',
      senhaHash: passwordHash,
    },
  })
  await prisma.morador.upsert({
    where: { pessoaId: resident.id },
    update: { apartamentoId: apartment101.id },
    create: {
      pessoaId: resident.id,
      apartamentoId: apartment101.id,
      responsavelFinanceiro: true,
    },
  })

  const overdueResident = await prisma.pessoa.upsert({
    where: { email: 'pedro@lbf.com.br' },
    update: {},
    create: {
      nome: 'Pedro Costa',
      cpf: '33333333333',
      email: 'pedro@lbf.com.br',
      senhaHash: passwordHash,
    },
  })
  await prisma.morador.upsert({
    where: { pessoaId: overdueResident.id },
    update: { apartamentoId: apartment201.id },
    create: {
      pessoaId: overdueResident.id,
      apartamentoId: apartment201.id,
      responsavelFinanceiro: true,
    },
  })

  const paidCharge = await prisma.cobranca.upsert({
    where: {
      apartamentoId_competencia: {
        apartamentoId: apartment101.id,
        competencia: new Date('2026-08-01'),
      },
    },
    update: {},
    create: {
      apartamentoId: apartment101.id,
      competencia: new Date('2026-08-01'),
      valor: 850,
      vencimento: new Date('2026-08-10'),
      status: 'PAGA',
    },
  })

  const payment = await prisma.pagamento.upsert({
    where: { cobrancaId: paidCharge.id },
    update: {},
    create: {
      cobrancaId: paidCharge.id,
      valorPago: 850,
      pagoEm: new Date('2026-08-08T14:20:00Z'),
      formaPagamento: 'PIX',
    },
  })
  await prisma.transacao.upsert({
    where: { id: '9cc8cb1b-2ac9-49e7-a7f3-53451078cb03' },
    update: {},
    create: {
      id: '9cc8cb1b-2ac9-49e7-a7f3-53451078cb03',
      pagamentoId: payment.id,
      tipo: 'RECEITA',
      categoria: 'Taxa condominial',
      descricao: 'Taxa condominial - agosto de 2026',
      valor: 850,
      data: new Date('2026-08-08'),
    },
  })

  const overdueCharge = await prisma.cobranca.upsert({
    where: {
      apartamentoId_competencia: {
        apartamentoId: apartment201.id,
        competencia: new Date('2026-08-01'),
      },
    },
    update: { status: 'VENCIDA' },
    create: {
      apartamentoId: apartment201.id,
      competencia: new Date('2026-08-01'),
      valor: 850,
      vencimento: new Date('2026-08-10'),
      status: 'VENCIDA',
    },
  })
  await prisma.boleto.upsert({
    where: { cobrancaId: overdueCharge.id },
    update: {},
    create: {
      cobrancaId: overdueCharge.id,
      linhaDigitavel: '34191.79001 01043.510047 91020.150008 8 97370000085000',
      codigoBarras: '34198973700000850001790001043510049102015000',
    },
  })

  const existingTicket = await prisma.chamado.findFirst({
    where: { moradorId: resident.id, titulo: 'Luz do corredor queimada' },
  })
  if (!existingTicket) {
    await prisma.chamado.create({
      data: {
        moradorId: resident.id,
        titulo: 'Luz do corredor queimada',
        descricao: 'A lâmpada do corredor do terceiro andar está queimada.',
        categoria: 'ELÉTRICA',
        status: 'ABERTO',
      },
    })
  }

  console.log('Dados de demonstração criados.')
  console.log('Síndico: sindico@lbf.com.br / 123456')
  console.log('Morador: morador@lbf.com.br / 123456')
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => prisma.$disconnect())
