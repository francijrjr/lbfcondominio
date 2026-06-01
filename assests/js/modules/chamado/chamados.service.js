import { MockData } from "../../data/mock-data.js";
import { Chamado } from "./chamados.model.js";

const STORAGE_KEY = "lbfcondominio.chamados";
const NOTIFICACOES_STORAGE_KEY = "lbfcondominio.notificacoes";

export class ChamadosService {
    listar() {
        return this
            .lerStorage()
            .map(
                chamado =>
                    new Chamado(
                        chamado.id,
                        chamado.titulo,
                        chamado.descricao,
                        chamado.dataAbertura,
                        chamado.status,
                        chamado.morador
                    )
            );
    }

    listarPorMorador(nomeMorador) {
        return this
            .listar()
            .filter(
                chamado =>
                    chamado.morador.nome === nomeMorador
            );
    }

    obterPorId(id) {
        return this
            .listar()
            .find(
                chamado =>
                    chamado.id === id
            );
    }

    criar({ titulo, descricao }) {
        const chamado = {
            id: this.gerarId(),
            titulo: titulo.trim(),
            descricao: descricao.trim(),
            dataAbertura: this.formatarData(new Date()),
            status: "aberto",
            morador: {
                nome: MockData.usuarioLogado.nome,
                apartamento: MockData.usuarioLogado.apartamento
            }
        };

        const chamados = [
            chamado,
            ...this.lerStorage()
        ];

        this.salvarStorage(chamados);

        return new Chamado(
            chamado.id,
            chamado.titulo,
            chamado.descricao,
            chamado.dataAbertura,
            chamado.status,
            chamado.morador
        );
    }

    resolver(id) {
        const chamados =
            this.lerStorage().map(
                chamado =>
                    chamado.id === id
                        ? {
                            ...chamado,
                            status: "resolvido"
                        }
                        : chamado
            );

        this.salvarStorage(chamados);
    }

    notificarMorador(chamadoId, tipo, mensagem) {
        const chamado =
            this.obterPorId(chamadoId);

        if (!chamado) {
            throw new Error("Chamado nao encontrado.");
        }

        const notificacao = {
            id: `not-${Date.now()}`,
            chamadoId,
            tipo,
            mensagem: mensagem.trim(),
            dataEnvio: this.formatarData(new Date()),
            morador: chamado.morador,
            lida: false
        };

        const notificacoes = [
            notificacao,
            ...this.lerNotificacoes()
        ];

        this.salvarNotificacoes(notificacoes);

        return notificacao;
    }

    lerNotificacoes() {
        const dados =
            localStorage.getItem(NOTIFICACOES_STORAGE_KEY);

        if (!dados) {
            this.salvarNotificacoes(MockData.notificacoes);
            return MockData.notificacoes;
        }

        try {
            return JSON.parse(dados);
        } catch {
            this.salvarNotificacoes(MockData.notificacoes);
            return MockData.notificacoes;
        }
    }

    salvarNotificacoes(notificacoes) {
        localStorage.setItem(
            NOTIFICACOES_STORAGE_KEY,
            JSON.stringify(notificacoes)
        );
    }

    obterUsuarioLogado() {
        return MockData.usuarioLogado;
    }

    lerStorage() {
        const dados =
            localStorage.getItem(STORAGE_KEY);

        if (!dados) {
            this.salvarStorage(MockData.chamados);
            return MockData.chamados;
        }

        try {
            return JSON.parse(dados);
        } catch {
            this.salvarStorage(MockData.chamados);
            return MockData.chamados;
        }
    }

    salvarStorage(chamados) {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(chamados)
        );
    }

    gerarId() {
        return `cha-${Date.now()}`;
    }

    formatarData(data) {
        return new Intl
            .DateTimeFormat("pt-BR")
            .format(data);
    }
}
