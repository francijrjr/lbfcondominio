# 1 Requisitos

O **LBF Condomínio** é um sistema de gestão condominial voltado para síndicos e moradores. Seu objetivo é centralizar cobranças, pagamentos, inadimplência, chamados de manutenção, comunicação e controle financeiro, substituindo controles manuais feitos por planilhas, e-mails e mensagens pessoais.

## 1.1 Requisitos Funcionais

|                                   | ID    | Título                                      | Dependência | Prioridade |
| --------------------------------- | ----- | ------------------------------------------- | ----------- | :--------: |
| <input type="checkbox" disabled> | RF001 | Autenticar usuário com login e senha        |             |     0      |
| <input type="checkbox" disabled> | RF002 | Cadastrar apartamentos                      | RF001       |     0      |
| <input type="checkbox" disabled> | RF003 | Cadastrar moradores                         | RF001, RF002|     0      |
| <input type="checkbox" disabled> | RF004 | Gerar cobranças mensais                     | RF002, RF003|     0      |
| <input type="checkbox" disabled> | RF005 | Emitir boleto condominial                   | RF004       |     0      |
| <input type="checkbox" disabled> | RF006 | Registrar o pagamento do condomínio         | RF004       |     0      |
| <input type="checkbox" disabled> | RF007 | Visualizar moradores inadimplentes          | RF004, RF006|     0      |
| <input type="checkbox" disabled> | RF008 | Visualizar cobranças e vencimentos          | RF004       |     0      |
| <input type="checkbox" disabled> | RF009 | Abrir chamado de manutenção                 | RF001, RF003|     0      |
| <input type="checkbox" disabled> | RF010 | Atualizar o status de chamados              | RF009       |     1      |
| <input type="checkbox" disabled> | RF011 | Consultar o status de chamados              | RF009, RF010|     1      |
| <input type="checkbox" disabled> | RF012 | Enviar avisos e notificações aos moradores  | RF003       |     1      |
| <input type="checkbox" disabled> | RF013 | Receber notificações de cobranças e avisos  | RF012       |     1      |
| <input type="checkbox" disabled> | RF014 | Atualizar telefone e e-mail do morador      | RF003       |     2      |
| <input type="checkbox" disabled> | RF015 | Registrar receitas e despesas               | RF001       |     0      |
| <input type="checkbox" disabled> | RF016 | Exibir painel financeiro do condomínio      | RF004, RF006, RF015 | 1 |
| <input type="checkbox" disabled> | RF017 | Gerar relatórios financeiros                | RF015, RF016|     1      |

## 1.2 Requisitos Não Funcionais

|                                   | ID     | Título                                                                    | Dependência | Prioridade |
| --------------------------------- | ------ | ------------------------------------------------------------------------- | ----------- | :--------: |
| <input type="checkbox" disabled> | RNF001 | Proteger a autenticação por meio de tokens JWT                            | RF001       |     0      |
| <input type="checkbox" disabled> | RNF002 | Impedir acesso a recursos sem autenticação válida                         | RF001       |     0      |
| <input type="checkbox" disabled> | RNF003 | Impedir que moradores acessem funções administrativas do síndico          | RF001       |     0      |
| <input type="checkbox" disabled> | RNF004 | Proteger o sistema contra SQL Injection e acessos indevidos               |             |     0      |
| <input type="checkbox" disabled> | RNF005 | Proteger os dados pessoais e financeiros dos moradores                    | RF003, RF004, RF006 | 0 |
| <input type="checkbox" disabled> | RNF006 | Manter a integridade dos dados entre frontend, API e banco de dados       |             |     0      |
| <input type="checkbox" disabled> | RNF007 | Permanecer estável com pelo menos 100 usuários simultâneos                |             |     1      |
| <input type="checkbox" disabled> | RNF008 | Apresentar resposta rápida nas consultas de boletos e relatórios          | RF008, RF017|     1      |
| <input type="checkbox" disabled> | RNF009 | Possuir interface intuitiva, moderna e com navegação fluida               |             |     1      |
| <input type="checkbox" disabled> | RNF010 | Adaptar a interface para celulares e notebooks                            |             |     1      |
| <input type="checkbox" disabled> | RNF011 | Funcionar nos principais navegadores e sistemas operacionais              |             |     1      |
| <input type="checkbox" disabled> | RNF012 | Recuperar o serviço após queda do servidor                                |             |     0      |
| <input type="checkbox" disabled> | RNF013 | Recuperar o banco de dados sem perda de informações                       |             |     0      |
| <input type="checkbox" disabled> | RNF014 | Permitir backup e restauração do banco de dados MySQL                     | RNF013      |     0      |
| <input type="checkbox" disabled> | RNF015 | Adotar arquitetura em camadas para separar responsabilidades              |             |     2      |
| <input type="checkbox" disabled> | RNF016 | Permitir manutenção, testes, escalabilidade e evolução do software        | RNF015      |     2      |

# 2 Regras de Negócio

|                                   | ID    | Título                                                                                 | Dependência | Prioridade |
| --------------------------------- | ----- | -------------------------------------------------------------------------------------- | ----------- | :--------: |
| <input type="checkbox" disabled> | RN001 | Apenas usuários autenticados podem acessar o sistema                                   | RF001       |     0      |
| <input type="checkbox" disabled> | RN002 | O síndico possui acesso às funções administrativas do condomínio                       | RF001       |     0      |
| <input type="checkbox" disabled> | RN003 | O morador não pode acessar funções administrativas exclusivas do síndico               | RF001       |     0      |
| <input type="checkbox" disabled> | RN004 | O cadastro de morador deve conter nome, CPF, e-mail e número do apartamento             | RF002, RF003|     0      |
| <input type="checkbox" disabled> | RN005 | O CPF é obrigatório para cadastrar um morador                                          | RF003       |     0      |
| <input type="checkbox" disabled> | RN006 | Cada morador deve estar vinculado a um apartamento cadastrado                          | RF002, RF003|     0      |
| <input type="checkbox" disabled> | RN007 | As cobranças devem ser geradas mensalmente para os apartamentos cadastrados             | RF004       |     0      |
| <input type="checkbox" disabled> | RN008 | Toda cobrança deve possuir valor, data de vencimento e status                          | RF004       |     0      |
| <input type="checkbox" disabled> | RN009 | Uma cobrança vencida e não paga deve ser identificada automaticamente como inadimplente | RF004, RF006, RF007 | 0 |
| <input type="checkbox" disabled> | RN010 | O síndico deve visualizar a relação de moradores inadimplentes                         | RF007       |     0      |
| <input type="checkbox" disabled> | RN011 | O morador deve visualizar somente suas próprias cobranças e vencimentos                 | RF008       |     0      |
| <input type="checkbox" disabled> | RN012 | O boleto deve ficar disponível ao morador para visualização ou download                 | RF005       |     0      |
| <input type="checkbox" disabled> | RN013 | Um chamado deve conter título, descrição e categoria do problema                       | RF009       |     0      |
| <input type="checkbox" disabled> | RN014 | Todo novo chamado deve receber inicialmente o status “Aberto”                          | RF009       |     0      |
| <input type="checkbox" disabled> | RN015 | O síndico pode alterar o status dos chamados de manutenção                             | RF010       |     1      |
| <input type="checkbox" disabled> | RN016 | O morador pode acompanhar o andamento dos chamados que abriu                           | RF011       |     1      |
| <input type="checkbox" disabled> | RN017 | Somente o síndico pode enviar avisos gerais aos moradores                              | RF012       |     1      |
| <input type="checkbox" disabled> | RN018 | Os moradores devem receber notificações relacionadas a cobranças e avisos do condomínio | RF013      |     1      |
| <input type="checkbox" disabled> | RN019 | O morador pode alterar apenas seus dados de contato, como telefone e e-mail             | RF014       |     2      |
| <input type="checkbox" disabled> | RN020 | O painel financeiro deve apresentar receitas, despesas e inadimplência                 | RF016       |     1      |
