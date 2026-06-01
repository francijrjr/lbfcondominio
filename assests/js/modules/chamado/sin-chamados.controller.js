import { ChamadosService } from "./chamados.service.js";
import { SindicoChamadosView } from "./sin-chamados.view.js";

class SindicoChamadosController {
    constructor() {
        this.service = new ChamadosService();
        this.view = new SindicoChamadosView();
        this.app = document.getElementById("app");
        this.chamadoSelecionadoId = null;
    }

    init() {
        this.renderizar();
        this.registrarEventos();
    }

    renderizar() {
        this.app.innerHTML =
            this.view.render({
                chamados: this.service.listar(),
                chamadoSelecionado: this.chamadoSelecionadoId
                    ? this.service.obterPorId(this.chamadoSelecionadoId)
                    : null
            });

        lucide.createIcons();
    }

    registrarEventos() {
        this.app.addEventListener(
            "click",
            event => {
                const card =
                    event.target.closest("[data-open-ticket]");

                const fechar =
                    event.target.closest("[data-close-modal]");

                const resolver =
                    event.target.closest("[data-resolve-ticket]");

                if (card) {
                    this.chamadoSelecionadoId =
                        card.dataset.openTicket;
                    this.renderizar();
                }

                if (fechar) {
                    this.chamadoSelecionadoId = null;
                    this.renderizar();
                }

                if (resolver) {
                    this.service.resolver(
                        resolver.dataset.resolveTicket
                    );
                    this.chamadoSelecionadoId = null;
                    this.renderizar();
                }
            }
        );

        this.app.addEventListener(
            "input",
            event => {
                if (event.target.id !== "mensagemInput") {
                    return;
                }

                const botao =
                    document.getElementById("btnEnviarMsg");

                botao.disabled =
                    event.target.value.trim().length === 0;
            }
        );

        window.addEventListener(
            "storage",
            () => this.renderizar()
        );
    }
}

const controller =
    new SindicoChamadosController();

controller.init();
