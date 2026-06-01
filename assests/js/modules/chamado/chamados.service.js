import { MockData } from "../../data/mock-data.js";
import { Chamado } from "./chamados.model.js";

const STORAGE_KEY = "lbfcondominio.chamados";

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
