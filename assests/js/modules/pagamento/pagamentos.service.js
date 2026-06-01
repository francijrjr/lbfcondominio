import { MockData } from "../../data/mock-data.js";
import { Pagamento } from "./pagamentos.model.js";

export class PagamentosService {
    listar() {
        return MockData.pagamentos.map(
            pagamento =>
                new Pagamento(
                    pagamento.id,
                    pagamento.mes,
                    pagamento.valor,
                    pagamento.status,
                    pagamento.vencimento,
                    pagamento.dataPagamento,
                    pagamento.boleto
                )
        );
    }

    obterContextoTela() {
        return {
            usuario: MockData.usuarioLogado,
            condominio: MockData.condominio,
            pagamentos: this.listar()
        };
    }

    obterPagamentoPorId(id) {
        return this
            .listar()
            .find(
                pagamento =>
                    pagamento.id === id
            );
    }

    gerarPdfBoleto(pagamentoId) {
        const pagamento =
            this.obterPagamentoPorId(pagamentoId);

        if (!pagamento || !pagamento.boleto) {
            throw new Error("Boleto nao encontrado.");
        }

        return this.criarPdfBoleto(
            pagamento,
            MockData.usuarioLogado,
            MockData.condominio
        );
    }

    criarPdfBoleto(pagamento, usuario, condominio) {
        const valorFormatado =
            this.formatarMoeda(pagamento.valor);

        const linhas = [
            "BOLETO CONDOMINIAL",
            "",
            `Condominio: ${condominio.nome}`,
            `CNPJ: ${condominio.cnpj}`,
            `Banco: ${condominio.banco}`,
            `Agencia / Conta: ${condominio.agencia} / ${condominio.conta}`,
            "",
            `Morador: ${usuario.nome}`,
            `Apartamento: ${usuario.apartamento}`,
            `Email: ${usuario.email}`,
            "",
            `Referencia: ${pagamento.mes}`,
            `Vencimento: ${pagamento.vencimento}`,
            `Valor: ${valorFormatado}`,
            `Status: ${pagamento.status}`,
            "",
            `Numero do documento: ${pagamento.boleto.numeroDocumento}`,
            `Nosso numero: ${pagamento.boleto.nossoNumero}`,
            "",
            "Linha digitavel:",
            pagamento.boleto.linhaDigitavel,
            "",
            "Codigo de barras:",
            pagamento.boleto.codigoBarras,
            "",
            "Instrucoes:"
        ];

        pagamento.boleto.instrucoes.forEach(
            instrucao =>
                linhas.push(`- ${instrucao}`)
        );

        return this.criarPdfSimples(linhas);
    }

    criarPdfSimples(linhas) {
        const conteudo =
            [
                "BT",
                "/F1 18 Tf",
                "50 790 Td",
                ...linhas.map(
                    (linha, index) => {
                        const fonte =
                            index === 0
                                ? "/F1 18 Tf"
                                : "/F1 11 Tf";

                        const deslocamento =
                            index === 0
                                ? "0 -34 Td"
                                : "0 -18 Td";

                        return `${fonte} (${this.escaparTextoPdf(linha)}) Tj ${deslocamento}`;
                    }
                ),
                "ET"
            ].join("\n");

        const objetos = [
            "<< /Type /Catalog /Pages 2 0 R >>",
            "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
            "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
            "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
            `<< /Length ${conteudo.length} >>\nstream\n${conteudo}\nendstream`
        ];

        let pdf = "%PDF-1.4\n";
        const offsets = [0];

        objetos.forEach(
            (objeto, index) => {
                offsets.push(pdf.length);
                pdf += `${index + 1} 0 obj\n${objeto}\nendobj\n`;
            }
        );

        const inicioXref = pdf.length;

        pdf += `xref\n0 ${objetos.length + 1}\n`;
        pdf += "0000000000 65535 f \n";

        offsets
            .slice(1)
            .forEach(
                offset => {
                    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
                }
            );

        pdf += `trailer\n<< /Size ${objetos.length + 1} /Root 1 0 R >>\n`;
        pdf += `startxref\n${inicioXref}\n%%EOF`;

        return new Blob(
            [pdf],
            {
                type: "application/pdf"
            }
        );
    }

    escaparTextoPdf(texto) {
        return String(texto)
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^\x20-\x7E]/g, "")
            .replace(/\\/g, "\\\\")
            .replace(/\(/g, "\\(")
            .replace(/\)/g, "\\)");
    }

    formatarMoeda(valor) {
        return new Intl
            .NumberFormat(
                "pt-BR",
                {
                    style: "currency",
                    currency: "BRL"
                }
            )
            .format(valor);
    }
}
