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

                const enviarNotificacao =
                    event.target.closest("[data-send-notification]");

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

                if (enviarNotificacao) {
                    this.enviarNotificacao(
                        enviarNotificacao.dataset.sendNotification
                    );
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

    enviarNotificacao(chamadoId) {
        const input =
            document.getElementById("mensagemInput");

        const tipo =
            document.getElementById("tipoNotificacao").value;

        this.service.notificarMorador(
            chamadoId,
            tipo,
            input.value
        );

        input.value = "";
        document.getElementById("btnEnviarMsg").disabled = true;

        this.showToast(
            tipo === "inadimplencia"
                ? "Notificacao de inadimplencia enviada ao morador."
                : "Notificacao do chamado enviada ao morador."
        );
    }

    showToast(message) {
        const toast =
            document.getElementById("toast");

        const toastMessage =
            document.getElementById("toastMessage");

        toastMessage.textContent = message;
        toast.classList.add("show");

        clearTimeout(this.toastTimeout);

        this.toastTimeout =
            setTimeout(
                () => toast.classList.remove("show"),
                3000
            );
    }
}

const controller =
    new SindicoChamadosController();

controller.init();
