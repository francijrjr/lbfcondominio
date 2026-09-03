# Guia de contribuição

Este repositório utiliza Git Flow, Conventional Commits e revisão obrigatória por Pull Request.

## Git Flow

As branches permanentes são:

- `main`: código estável e pronto para produção;
- `develop`: integração das funcionalidades da próxima versão.

As branches temporárias seguem estes padrões:

- `feature/<nome-curto>`: nova funcionalidade criada a partir de `develop`;
- `release/<versão>`: preparação de uma versão criada a partir de `develop`;
- `hotfix/<nome-curto>`: correção urgente criada a partir de `main`;
- `support/<versão>`: manutenção de uma versão anterior, quando necessária.

Exemplo para iniciar uma funcionalidade:

```bash
git switch develop
git pull --ff-only origin develop
git switch -c feature/cadastro-morador
```

O fluxo de integração é:

1. `feature/*` deve abrir Pull Request para `develop`;
2. `release/*` deve abrir Pull Request para `main` e, depois da entrega, ser sincronizada com `develop`;
3. `hotfix/*` deve abrir Pull Request para `main` e, depois da correção, ser sincronizada com `develop`;
4. alterações não devem ser enviadas diretamente para `main`.

## Conventional Commits

Toda mensagem de commit e todo título de Pull Request devem seguir o formato:

```text
<tipo>(<escopo opcional>): <descrição curta>
```

Tipos permitidos:

- `feat`: nova funcionalidade;
- `fix`: correção de defeito;
- `docs`: documentação;
- `style`: formatação sem alteração de comportamento;
- `refactor`: refatoração sem nova funcionalidade ou correção;
- `perf`: melhoria de desempenho;
- `test`: criação ou alteração de testes;
- `build`: sistema de build ou dependências;
- `ci`: integração e entrega contínuas;
- `chore`: manutenção geral;
- `revert`: reversão de alteração.

Exemplos:

```text
feat(chamados): adiciona filtro por status
fix(login): impede acesso sem sessão válida
docs: atualiza regras de contribuição
```

Alterações incompatíveis devem usar `!` após o tipo ou escopo e explicar a quebra no corpo do commit:

```text
feat(api)!: altera formato da resposta de cobranças
```

## Pull Requests

- Mantenha o Pull Request pequeno e com um único objetivo.
- Use um título no padrão Conventional Commits.
- Descreva o problema, a solução e como a alteração foi testada.
- Relacione issues ou requisitos afetados quando existirem.
- Atualize testes e documentação relevantes.
- Abra como rascunho enquanto a alteração não estiver pronta para revisão.
- Resolva todos os comentários antes do merge.
- Utilize **Squash and merge** para manter um commit convencional por Pull Request.

## Code review

Todo Pull Request para `main` precisa de pelo menos uma aprovação de outra pessoa com acesso ao repositório. Novos commits invalidam aprovações anteriores e todas as conversas devem estar resolvidas.

Durante a revisão, verifique:

- aderência aos requisitos e às regras de negócio;
- correção, segurança e tratamento de erros;
- legibilidade e simplicidade do código;
- cobertura de testes compatível com o risco;
- ausência de credenciais ou dados pessoais no código;
- impacto em dispositivos móveis e navegadores suportados;
- atualização da documentação.

O autor do Pull Request é responsável por responder aos comentários e solicitar uma nova revisão após as correções.
