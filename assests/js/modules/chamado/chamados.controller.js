import { ChamadosService } from "./chamados.service.js";
import { ChamadosView } from "./chamados.view.js";

class ChamadosController {
    constructor() {
        this.service = new ChamadosService();
        this.view = new ChamadosView();
        this.app = document.getElementById("app");
    }

    init() {
        this.renderizar();
        this.registrarEventos();
    }

    renderizar() {
        const usuario =
            this.service.obterUsuarioLogado();

        this.app.innerHTML =
            this.view.render({
                usuario,
                chamados: this.service.listarPorMorador(usuario.nome)
            });

        lucide.createIcons();
    }

    registrarEventos() {
        this.app.addEventListener(
            "click",
            event => {
                if (event.target.closest("[data-open-form]")) {
                    this.toggleForm(true);
                }

                if (event.target.closest("[data-close-form]")) {
                    this.toggleForm(false);
                }
            }
        );

        this.app.addEventListener(
            "submit",
            event => {
                if (event.target.id !== "formChamado") {
                    return;
                }

                event.preventDefault();
                this.criarChamado(event.target);
            }
        );
    }

    criarChamado(form) {
        this.service.criar({
            titulo: form.titulo.value,
            descricao: form.descricao.value
        });

        this.renderizar();
        this.showToast("Chamado salvo e enviado ao sindico.");
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

    toggleForm(show) {
        const formContainer =
            document.getElementById("formNovoChamado");

        const btnNewTicket =
            document.querySelector(".btn-new-ticket");

        formContainer.style.display = show
            ? "block"
            : "none";

        btnNewTicket.style.display = show
            ? "none"
            : "flex";

        if (!show) {
            document.getElementById("formChamado").reset();
        }
    }
}

const controller =
    new ChamadosController();

controller.init();
