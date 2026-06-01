import { UsuariosService } from "./usuarios.service.js";
import { UsuariosView } from "./usuarios.view.js";

class UsuariosController {
    constructor() {
        this.service = new UsuariosService();
        this.view = new UsuariosView();
        this.app = document.getElementById("app");
        this.toast = null;
    }

    init() {
        this.renderizar();
        this.registrarEventos();
    }

    renderizar() {
        this.app.innerHTML =
            this.view.render({
                usuarios: this.service.listar(),
                toast: this.toast
            });

        lucide.createIcons();
    }

    registrarEventos() {
        this.app.addEventListener(
            "submit",
            event => {
                if (event.target.id !== "formUsuario") {
                    return;
                }

                event.preventDefault();
                this.criarUsuario(event.target);
            }
        );

        this.app.addEventListener(
            "click",
            event => {
                const toggle =
                    event.target.closest("[data-toggle-user]");

                const remove =
                    event.target.closest("[data-remove-user]");

                if (toggle) {
                    this.service.alternarStatus(toggle.dataset.toggleUser);
                    this.showToast("Status atualizado", "A permissao de acesso foi atualizada.");
                }

                if (remove) {
                    this.service.remover(remove.dataset.removeUser);
                    this.showToast("Usuario removido", "O usuario nao tem mais acesso ao sistema.");
                }
            }
        );
    }

    criarUsuario(form) {
        try {
            this.service.criar({
                nome: form.nome.value,
                email: form.email.value,
                senha: form.senha.value,
                role: form.role.value,
                apartamento: form.apartamento.value
            });

            form.reset();
            this.showToast("Usuario salvo", "O acesso foi criado com sucesso.");
        } catch (error) {
            this.showToast("Erro ao salvar", error.message, "error");
        }
    }

    showToast(title, message, type = "success") {
        this.toast = {
            title,
            message,
            type
        };

        this.renderizar();

        clearTimeout(this.toastTimeout);

        this.toastTimeout =
            setTimeout(
                () => {
                    this.toast = null;
                    this.renderizar();
                },
                3000
            );
    }
}

const controller =
    new UsuariosController();

controller.init();
