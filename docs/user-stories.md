# User Stories

Este documento descreve as histórias de usuário do **LBF Condomínio** com base nos requisitos definidos em [features.md](features.md).

## 1. Perfis

- **Usuário:** pessoa autorizada a acessar o sistema como síndico ou morador.
- **Síndico:** responsável pelos cadastros, cobranças, finanças, chamados e comunicação do condomínio.
- **Morador:** pessoa vinculada a um apartamento que consulta cobranças, recebe avisos e solicita manutenção.

## 2. Histórias

|                                   | ID    | Título                              | Perfil   | Requisitos relacionados | Prioridade |
| --------------------------------- | ----- | ----------------------------------- | -------- | ----------------------- | :--------: |
| <input type="checkbox" disabled> | US001 | Acessar o sistema                   | Usuário  | RF001                   |     0      |
| <input type="checkbox" disabled> | US002 | Cadastrar apartamentos              | Síndico  | RF002                   |     0      |
| <input type="checkbox" disabled> | US003 | Cadastrar moradores                 | Síndico  | RF003                   |     0      |
| <input type="checkbox" disabled> | US004 | Gerar cobranças mensais             | Síndico  | RF004                   |     0      |
| <input type="checkbox" disabled> | US005 | Emitir boleto condominial           | Síndico  | RF005                   |     0      |
| <input type="checkbox" disabled> | US006 | Registrar pagamentos               | Síndico  | RF006                   |     0      |
| <input type="checkbox" disabled> | US007 | Acompanhar inadimplência            | Síndico  | RF007                   |     0      |
| <input type="checkbox" disabled> | US008 | Consultar cobranças e boletos       | Morador  | RF005, RF008            |     0      |
| <input type="checkbox" disabled> | US009 | Abrir chamado de manutenção        | Morador  | RF009                   |     0      |
| <input type="checkbox" disabled> | US010 | Gerenciar chamados                 | Síndico  | RF010                   |     1      |
| <input type="checkbox" disabled> | US011 | Acompanhar chamado                 | Morador  | RF011                   |     1      |
| <input type="checkbox" disabled> | US012 | Enviar avisos                      | Síndico  | RF012                   |     1      |
| <input type="checkbox" disabled> | US013 | Receber notificações               | Morador  | RF013                   |     1      |
| <input type="checkbox" disabled> | US014 | Atualizar dados de contato         | Morador  | RF014                   |     2      |
| <input type="checkbox" disabled> | US015 | Registrar receitas e despesas     | Síndico  | RF015                   |     0      |
| <input type="checkbox" disabled> | US016 | Consultar painel financeiro       | Síndico  | RF016                   |     1      |
| <input type="checkbox" disabled> | US017 | Gerar relatório financeiro        | Síndico  | RF017                   |     1      |

### US001 - Acessar o sistema

**Como** usuário, **quero** entrar no sistema com login e senha **para** acessar somente as funcionalidades permitidas ao meu perfil.

**Critérios de aceitação:**

- Dado um usuário ativo com credenciais válidas, quando ele realizar o login, então o sistema deve autenticá-lo e exibir sua página inicial.
- Dadas credenciais inválidas, quando o usuário tentar entrar, então o sistema deve negar o acesso e apresentar uma mensagem clara.
- Dado um usuário não autenticado, quando ele tentar acessar uma área protegida, então o sistema deve solicitar autenticação.
- O morador não deve ter acesso às funcionalidades administrativas do síndico.

### US002 - Cadastrar apartamentos

**Como** síndico, **quero** cadastrar os apartamentos **para** organizar as unidades e vincular seus moradores.

**Critérios de aceitação:**

- O sistema deve permitir informar os dados necessários para identificar o apartamento.
- O sistema deve impedir o cadastro duplicado da mesma unidade.
- Após um cadastro válido, o apartamento deve ficar disponível para vinculação a moradores.

### US003 - Cadastrar moradores

**Como** síndico, **quero** cadastrar moradores **para** associá-los aos apartamentos e administrar os serviços do condomínio.

**Critérios de aceitação:**

- O cadastro deve exigir nome, CPF, e-mail e apartamento.
- O sistema deve impedir o cadastro quando o CPF não for informado.
- O apartamento selecionado deve existir no sistema.
- Após um cadastro válido, o morador deve aparecer na relação de moradores.

### US004 - Gerar cobranças mensais

**Como** síndico, **quero** gerar cobranças mensais para os apartamentos **para** controlar o recebimento das taxas condominiais.

**Critérios de aceitação:**

- A cobrança deve estar vinculada a um apartamento cadastrado.
- A cobrança deve possuir valor, data de vencimento e status.
- Após a geração, a cobrança deve aparecer na relação de cobranças do apartamento.
- O sistema deve impedir a geração duplicada da mesma cobrança mensal para o apartamento.

### US005 - Emitir boleto condominial

**Como** síndico, **quero** emitir o boleto de uma cobrança **para** disponibilizar o documento de pagamento ao morador.

**Critérios de aceitação:**

- O boleto deve ser gerado a partir de uma cobrança existente.
- O boleto deve apresentar os dados da cobrança, do apartamento e do vencimento.
- O documento gerado deve ficar disponível para visualização ou download.

### US006 - Registrar pagamentos

**Como** síndico, **quero** registrar o pagamento de uma cobrança **para** manter a situação financeira do condomínio atualizada.

**Critérios de aceitação:**

- O pagamento deve estar vinculado a uma cobrança existente.
- Uma cobrança paga deve ter seu status atualizado.
- O sistema deve impedir o registro duplicado do mesmo pagamento.
- O pagamento deve refletir no painel e nos relatórios financeiros.

### US007 - Acompanhar inadimplência

**Como** síndico, **quero** visualizar os moradores inadimplentes **para** acompanhar e realizar as cobranças necessárias.

**Critérios de aceitação:**

- Cobranças vencidas e não pagas devem ser identificadas automaticamente como inadimplentes.
- A listagem deve identificar o morador, o apartamento e a cobrança vencida.
- Após a confirmação do pagamento, a cobrança não deve continuar na lista de inadimplência.

### US008 - Consultar cobranças e boletos

**Como** morador, **quero** consultar minhas cobranças, vencimentos e boletos **para** acompanhar e pagar o condomínio.

**Critérios de aceitação:**

- O morador deve visualizar somente as cobranças de seu apartamento.
- Cada cobrança deve apresentar valor, vencimento e status.
- Quando houver boleto emitido, o morador deve poder visualizá-lo ou baixá-lo.

### US009 - Abrir chamado de manutenção

**Como** morador, **quero** abrir um chamado de manutenção **para** comunicar problemas do condomínio sem utilizar o contato pessoal do síndico.

**Critérios de aceitação:**

- O chamado deve exigir título, descrição e categoria.
- Todo novo chamado deve ser registrado com o status `Aberto`.
- O chamado deve ficar vinculado ao morador que o criou.
- Após o envio, o sistema deve confirmar o registro do chamado.

### US010 - Gerenciar chamados

**Como** síndico, **quero** consultar e atualizar os chamados **para** organizar o atendimento das solicitações dos moradores.

**Critérios de aceitação:**

- O síndico deve visualizar os chamados registrados e seus respectivos dados.
- O síndico deve poder alterar o status de um chamado.
- A alteração deve ficar disponível para consulta pelo morador que abriu o chamado.

### US011 - Acompanhar chamado

**Como** morador, **quero** acompanhar o andamento dos meus chamados **para** saber a situação de cada solicitação.

**Critérios de aceitação:**

- O morador deve visualizar somente os chamados vinculados a ele.
- A consulta deve apresentar o título, a categoria e o status atual.
- Uma mudança realizada pelo síndico deve aparecer na consulta do morador.

### US012 - Enviar avisos

**Como** síndico, **quero** enviar avisos aos moradores **para** centralizar a comunicação do condomínio.

**Critérios de aceitação:**

- Somente o síndico pode criar e enviar avisos gerais.
- O aviso deve possuir conteúdo e data de envio.
- O aviso enviado deve ficar disponível aos moradores destinatários.

### US013 - Receber notificações

**Como** morador, **quero** receber notificações sobre cobranças e avisos **para** acompanhar informações importantes do condomínio.

**Critérios de aceitação:**

- O morador deve ser notificado quando receber um novo aviso.
- O morador deve receber notificações relacionadas às suas cobranças.
- A notificação deve permitir identificar o assunto e a data da mensagem.

### US014 - Atualizar dados de contato

**Como** morador, **quero** atualizar meu telefone e e-mail **para** manter meus dados de contato corretos.

**Critérios de aceitação:**

- O morador deve poder alterar apenas os próprios dados de contato permitidos.
- O sistema deve validar o formato do e-mail informado.
- Após salvar dados válidos, as novas informações devem aparecer no perfil.

### US015 - Registrar receitas e despesas

**Como** síndico, **quero** registrar receitas e despesas **para** manter o controle financeiro do condomínio.

**Critérios de aceitação:**

- O lançamento deve informar tipo, descrição, valor e data.
- O sistema deve impedir lançamentos sem os campos obrigatórios.
- Um lançamento válido deve ser considerado nos totais financeiros.

### US016 - Consultar painel financeiro

**Como** síndico, **quero** consultar um painel financeiro **para** compreender a situação do condomínio e tomar decisões.

**Critérios de aceitação:**

- O painel deve apresentar receitas, despesas e inadimplência.
- Os valores devem refletir cobranças, pagamentos e lançamentos registrados.
- As informações devem ser apresentadas de forma clara e adequada a celulares e notebooks.

### US017 - Gerar relatório financeiro

**Como** síndico, **quero** gerar relatórios financeiros **para** analisar e prestar contas da movimentação do condomínio.

**Critérios de aceitação:**

- O relatório deve utilizar os dados financeiros registrados no sistema.
- O relatório deve apresentar receitas, despesas e resultado do período.
- O sistema deve permitir selecionar o período do relatório.
- A geração deve preservar a integridade dos valores apresentados no painel financeiro.

## 3. Definição de pronto

Uma história pode ser considerada concluída quando:

- todos os critérios de aceitação forem atendidos;
- os fluxos de sucesso e erro tiverem sido testados;
- as regras de acesso entre síndico e morador forem respeitadas;
- não houver defeitos críticos conhecidos;
- a documentação afetada estiver atualizada;
- o Pull Request tiver sido aprovado conforme o guia de contribuição.
