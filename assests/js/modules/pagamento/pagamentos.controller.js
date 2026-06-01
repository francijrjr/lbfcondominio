import { PagamentosService } from "./pagamentos.service.js";
import { PagamentosView } from "./pagamentos.view.js";

class PagamentosController {
    constructor() {
        this.service = new PagamentosService();
        this.view = new PagamentosView();
        this.app = document.getElementById("app");
    }

    init() {
        this.renderizar();
        this.registrarEventos();
        lucide.createIcons();
    }

    renderizar() {
        this.app.innerHTML =
            this.view.render(
                this.service.obterContextoTela()
            );
    }

    registrarEventos() {
        this.app.addEventListener(
            "click",
            event => {
                const botao =
                    event.target.closest("[data-download-boleto]");

                if (!botao) {
                    return;
                }

                this.baixarBoleto(
                    botao.dataset.downloadBoleto
                );
            }
        );
    }

    baixarBoleto(pagamentoId) {
        const pagamento =
            this.service.obterPagamentoPorId(pagamentoId);

        const pdf =
            this.service.gerarPdfBoleto(pagamentoId);

        const url =
            URL.createObjectURL(pdf);

        const link =
            document.createElement("a");

        link.href = url;
        link.download = `boleto-${pagamento.mes.toLowerCase().replace(/\s+/g, "-")}.pdf`;
        link.click();

        setTimeout(
            () => URL.revokeObjectURL(url),
            1000
        );
    }
}

const controller =
    new PagamentosController();

controller.init();
