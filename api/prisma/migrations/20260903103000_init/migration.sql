BEGIN TRY

BEGIN TRAN;

-- CreateSchema
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = N'dbo') EXEC sp_executesql N'CREATE SCHEMA [dbo];';

-- CreateTable
CREATE TABLE [dbo].[pessoas] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [nome] NVARCHAR(160) NOT NULL,
    [cpf] VARCHAR(11) NOT NULL,
    [email] NVARCHAR(255) NOT NULL,
    [telefone] VARCHAR(20),
    [senhaHash] VARCHAR(255) NOT NULL,
    [ativo] BIT NOT NULL CONSTRAINT [pessoas_ativo_df] DEFAULT 1,
    [criadoEm] DATETIME2 NOT NULL CONSTRAINT [pessoas_criadoEm_df] DEFAULT CURRENT_TIMESTAMP,
    [atualizadoEm] DATETIME2 NOT NULL,
    CONSTRAINT [pessoas_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [pessoas_cpf_key] UNIQUE NONCLUSTERED ([cpf]),
    CONSTRAINT [pessoas_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[sindicos] (
    [pessoaId] UNIQUEIDENTIFIER NOT NULL,
    [inicioMandato] DATETIME2 NOT NULL,
    [fimMandato] DATETIME2,
    CONSTRAINT [sindicos_pkey] PRIMARY KEY CLUSTERED ([pessoaId])
);

-- CreateTable
CREATE TABLE [dbo].[apartamentos] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [numero] NVARCHAR(20) NOT NULL,
    [bloco] NVARCHAR(40) NOT NULL CONSTRAINT [apartamentos_bloco_df] DEFAULT '',
    [status] VARCHAR(20) NOT NULL CONSTRAINT [apartamentos_status_df] DEFAULT 'ATIVO',
    CONSTRAINT [apartamentos_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [apartamentos_bloco_numero_key] UNIQUE NONCLUSTERED ([bloco],[numero])
);

-- CreateTable
CREATE TABLE [dbo].[moradores] (
    [pessoaId] UNIQUEIDENTIFIER NOT NULL,
    [apartamentoId] UNIQUEIDENTIFIER NOT NULL,
    [responsavelFinanceiro] BIT NOT NULL CONSTRAINT [moradores_responsavelFinanceiro_df] DEFAULT 0,
    CONSTRAINT [moradores_pkey] PRIMARY KEY CLUSTERED ([pessoaId])
);

-- CreateTable
CREATE TABLE [dbo].[cobrancas] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [apartamentoId] UNIQUEIDENTIFIER NOT NULL,
    [competencia] DATE NOT NULL,
    [valor] DECIMAL(12,2) NOT NULL,
    [vencimento] DATE NOT NULL,
    [status] VARCHAR(20) NOT NULL CONSTRAINT [cobrancas_status_df] DEFAULT 'PENDENTE',
    [criadaEm] DATETIME2 NOT NULL CONSTRAINT [cobrancas_criadaEm_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [cobrancas_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [cobrancas_apartamentoId_competencia_key] UNIQUE NONCLUSTERED ([apartamentoId],[competencia])
);

-- CreateTable
CREATE TABLE [dbo].[boletos] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [cobrancaId] UNIQUEIDENTIFIER NOT NULL,
    [linhaDigitavel] VARCHAR(80) NOT NULL,
    [codigoBarras] VARCHAR(80) NOT NULL,
    [urlDocumento] NVARCHAR(1000),
    [emitidoEm] DATETIME2 NOT NULL CONSTRAINT [boletos_emitidoEm_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [boletos_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [boletos_cobrancaId_key] UNIQUE NONCLUSTERED ([cobrancaId]),
    CONSTRAINT [boletos_linhaDigitavel_key] UNIQUE NONCLUSTERED ([linhaDigitavel]),
    CONSTRAINT [boletos_codigoBarras_key] UNIQUE NONCLUSTERED ([codigoBarras])
);

-- CreateTable
CREATE TABLE [dbo].[pagamentos] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [cobrancaId] UNIQUEIDENTIFIER NOT NULL,
    [valorPago] DECIMAL(12,2) NOT NULL,
    [pagoEm] DATETIME2 NOT NULL,
    [formaPagamento] VARCHAR(30) NOT NULL,
    [comprovante] NVARCHAR(1000),
    CONSTRAINT [pagamentos_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [pagamentos_cobrancaId_key] UNIQUE NONCLUSTERED ([cobrancaId])
);

-- CreateTable
CREATE TABLE [dbo].[chamados] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [moradorId] UNIQUEIDENTIFIER NOT NULL,
    [apartamentoId] UNIQUEIDENTIFIER,
    [titulo] NVARCHAR(160) NOT NULL,
    [descricao] NVARCHAR(max) NOT NULL,
    [categoria] VARCHAR(50) NOT NULL,
    [status] VARCHAR(30) NOT NULL CONSTRAINT [chamados_status_df] DEFAULT 'ABERTO',
    [abertoEm] DATETIME2 NOT NULL CONSTRAINT [chamados_abertoEm_df] DEFAULT CURRENT_TIMESTAMP,
    [atualizadoEm] DATETIME2 NOT NULL,
    CONSTRAINT [chamados_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[manutencoes] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [chamadoId] UNIQUEIDENTIFIER NOT NULL,
    [responsavel] NVARCHAR(160),
    [descricaoServico] NVARCHAR(max),
    [custo] DECIMAL(12,2),
    [inicioEm] DATETIME2,
    [conclusaoEm] DATETIME2,
    [status] VARCHAR(30) NOT NULL CONSTRAINT [manutencoes_status_df] DEFAULT 'PLANEJADA',
    CONSTRAINT [manutencoes_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [manutencoes_chamadoId_key] UNIQUE NONCLUSTERED ([chamadoId])
);

-- CreateTable
CREATE TABLE [dbo].[transacoes] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [pagamentoId] UNIQUEIDENTIFIER,
    [tipo] VARCHAR(20) NOT NULL,
    [categoria] NVARCHAR(80) NOT NULL,
    [descricao] NVARCHAR(255) NOT NULL,
    [valor] DECIMAL(12,2) NOT NULL,
    [data] DATE NOT NULL,
    [criadaEm] DATETIME2 NOT NULL CONSTRAINT [transacoes_criadaEm_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [transacoes_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[relatorios_financeiros] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [inicioPeriodo] DATE NOT NULL,
    [fimPeriodo] DATE NOT NULL,
    [totalReceitas] DECIMAL(12,2) NOT NULL,
    [totalDespesas] DECIMAL(12,2) NOT NULL,
    [saldo] DECIMAL(12,2) NOT NULL,
    [geradoEm] DATETIME2 NOT NULL CONSTRAINT [relatorios_financeiros_geradoEm_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [relatorios_financeiros_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[_RelatorioFinanceiroToTransacao] (
    [A] UNIQUEIDENTIFIER NOT NULL,
    [B] UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [_RelatorioFinanceiroToTransacao_AB_unique] UNIQUE NONCLUSTERED ([A],[B])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [moradores_apartamentoId_idx] ON [dbo].[moradores]([apartamentoId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [cobrancas_status_vencimento_idx] ON [dbo].[cobrancas]([status], [vencimento]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [chamados_moradorId_idx] ON [dbo].[chamados]([moradorId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [chamados_status_abertoEm_idx] ON [dbo].[chamados]([status], [abertoEm]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [transacoes_tipo_data_idx] ON [dbo].[transacoes]([tipo], [data]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [transacoes_pagamentoId_idx] ON [dbo].[transacoes]([pagamentoId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [relatorios_financeiros_inicioPeriodo_fimPeriodo_idx] ON [dbo].[relatorios_financeiros]([inicioPeriodo], [fimPeriodo]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [_RelatorioFinanceiroToTransacao_B_index] ON [dbo].[_RelatorioFinanceiroToTransacao]([B]);

-- AddForeignKey
ALTER TABLE [dbo].[sindicos] ADD CONSTRAINT [sindicos_pessoaId_fkey] FOREIGN KEY ([pessoaId]) REFERENCES [dbo].[pessoas]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[moradores] ADD CONSTRAINT [moradores_pessoaId_fkey] FOREIGN KEY ([pessoaId]) REFERENCES [dbo].[pessoas]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[moradores] ADD CONSTRAINT [moradores_apartamentoId_fkey] FOREIGN KEY ([apartamentoId]) REFERENCES [dbo].[apartamentos]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[cobrancas] ADD CONSTRAINT [cobrancas_apartamentoId_fkey] FOREIGN KEY ([apartamentoId]) REFERENCES [dbo].[apartamentos]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[boletos] ADD CONSTRAINT [boletos_cobrancaId_fkey] FOREIGN KEY ([cobrancaId]) REFERENCES [dbo].[cobrancas]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[pagamentos] ADD CONSTRAINT [pagamentos_cobrancaId_fkey] FOREIGN KEY ([cobrancaId]) REFERENCES [dbo].[cobrancas]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[chamados] ADD CONSTRAINT [chamados_moradorId_fkey] FOREIGN KEY ([moradorId]) REFERENCES [dbo].[moradores]([pessoaId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[chamados] ADD CONSTRAINT [chamados_apartamentoId_fkey] FOREIGN KEY ([apartamentoId]) REFERENCES [dbo].[apartamentos]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[manutencoes] ADD CONSTRAINT [manutencoes_chamadoId_fkey] FOREIGN KEY ([chamadoId]) REFERENCES [dbo].[chamados]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[transacoes] ADD CONSTRAINT [transacoes_pagamentoId_fkey] FOREIGN KEY ([pagamentoId]) REFERENCES [dbo].[pagamentos]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[_RelatorioFinanceiroToTransacao] ADD CONSTRAINT [_RelatorioFinanceiroToTransacao_A_fkey] FOREIGN KEY ([A]) REFERENCES [dbo].[relatorios_financeiros]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_RelatorioFinanceiroToTransacao] ADD CONSTRAINT [_RelatorioFinanceiroToTransacao_B_fkey] FOREIGN KEY ([B]) REFERENCES [dbo].[transacoes]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
