export class SindicoChamadosView {
    render({ chamados, chamadoSelecionado = null }) {
        const abertos =
            chamados.filter(
                chamado =>
                    chamado.status === "aberto"
            ).length;

        return `
            ${this.renderMobileHeader()}
            ${this.renderSidebar()}

            <main class="main-wrapper">
                <header class="topbar">
                    <h2>Gestao de Chamados</h2>
                    <p>Acompanhe todos os chamados abertos</p>
                </header>

                <section class="content-area">
                    <div class="summary-banner">
                        <div class="summary-icon">
                            <i data-lucide="message-square" style="width: 28px; height: 28px;"></i>
                        </div>
                        <div class="summary-info">
                            <h3>Chamados Abertos</h3>
                            <p>${abertos}</p>
                        </div>
                    </div>

                    <h3 class="section-title">
                        <i data-lucide="clock" style="color: #99A1AF;"></i>
                        Todos os Chamados
                    </h3>

                    <div class="tickets-grid">
                        ${chamados.map(chamado => this.renderChamado(chamado)).join("")}
                    </div>
                </section>
            </main>

            ${this.renderMobileBottomNav()}
            ${this.renderModal(chamadoSelecionado)}
            ${this.renderToast()}
        `;
    }

    renderMobileHeader() {
        return `
            <header class="mobile-header">
                <div class="mh-left">
                    <img src="../assests/img/logo.png" alt="Logo LBF" />
                    <div class="mh-user-info">
                        <h2>Francis</h2>
                        <p>Sindico</p>
                    </div>
                </div>
                <a href="login.html" class="mh-logout">
                    <i data-lucide="log-out"></i>
                    <span>Sair</span>
                </a>
            </header>
        `;
    }

    renderSidebar() {
        return `
            <aside class="sidebar">
                <div class="sidebar-header">
                    <img src="../assests/img/logo.png" alt="Logo CondoApp" />
                    <div class="brand-info">
                        <h1>Lui</h1>
                        <span>Area do Sindico</span>
                    </div>
                </div>

                <nav class="sidebar-nav">
                    <a href="sin_financeiro.html" class="nav-item">
                        <i data-lucide="dollar-sign"></i>
                        <span>Financeiro</span>
                    </a>
                    <a href="#" class="nav-item active">
                        <i data-lucide="message-square"></i>
                        <span>Chamados</span>
                    </a>
                    <a href="sin_usuarios.html" class="nav-item">
                        <i data-lucide="users"></i>
                        <span>Usuarios</span>
                    </a>
                </nav>

                <div class="sidebar-footer">
                    <a href="login.html" class="nav-item">
                        <i data-lucide="log-out"></i>
                        <span>Sair</span>
                    </a>
                </div>
            </aside>
        `;
    }

    renderChamado(chamado) {
        return `
            <div class="ticket-card" data-open-ticket="${chamado.id}">
                <div class="ticket-main">
                    <div class="ticket-icon">
                        <i data-lucide="message-square"></i>
                    </div>
                    <div class="ticket-details">
                        <h4>${chamado.titulo}</h4>
                        <p>${chamado.descricao}</p>
                    </div>
                </div>
                <div class="ticket-footer">
                    <div class="user-info">
                        <div class="user-avatar">
                            <i data-lucide="user"></i>
                        </div>
                        <div class="user-details">
                            <h5>${chamado.morador.nome}</h5>
                            <span>Apt ${chamado.morador.apartamento}</span>
                        </div>
                    </div>
                    <div class="status-info">
                        <span class="date">${chamado.dataAbertura}</span>
                        <span class="badge-open">${this.formatarStatus(chamado.status)}</span>
                    </div>
                </div>
            </div>
        `;
    }

    renderModal(chamado) {
        if (!chamado) {
            return "";
        }

        return `
            <div class="modal-overlay" id="detalhesModal" style="display: flex;">
                <div class="modal-container">
                    <div class="modal-header">
                        <div class="header-title-group">
                            <div class="header-icon">
                                <i data-lucide="message-square"></i>
                            </div>
                            <div class="header-text">
                                <h2>Detalhes do Chamado</h2>
                                <span>#${chamado.id}</span>
                            </div>
                        </div>
                        <button class="btn-close" type="button" data-close-modal>
                            <i data-lucide="x-circle"></i>
                        </button>
                    </div>

                    <div class="modal-body">
                        <div class="user-card">
                            <div class="user-card-top">
                                <div class="avatar">
                                    <i data-lucide="user"></i>
                                </div>
                                <div>
                                    <div class="user-name">${chamado.morador.nome}</div>
                                    <div class="user-apt">Apt ${chamado.morador.apartamento}</div>
                                </div>
                            </div>
                            <div class="user-card-bottom">
                                <div class="open-date">
                                    <i data-lucide="clock" style="width: 16px; height: 16px;"></i>
                                    Aberto em ${chamado.dataAbertura}
                                </div>
                                <span class="badge-open" style="padding: 4px 10px">
                                    ${this.formatarStatus(chamado.status)}
                                </span>
                            </div>
                        </div>

                        <div class="problem-desc">
                            <h3>${chamado.titulo}</h3>
                            <p>${chamado.descricao}</p>
                        </div>

                        <div class="notification-box">
                            <label>Enviar notificacao ao morador</label>
                            <div class="input-group">
                                <input
                                    type="text"
                                    id="mensagemInput"
                                    class="input-notify"
                                    placeholder="Digite sua mensagem..."
                                />
                                <button
                                    class="btn-send"
                                    id="btnEnviarMsg"
                                    type="button"
                                    data-send-notification="${chamado.id}"
                                    disabled
                                >
                                    <i data-lucide="file-text"></i>
                                    Enviar
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button class="btn-footer btn-cancel" type="button" data-close-modal>
                            Fechar
                        </button>
                        <button
                            class="btn-footer btn-resolve"
                            type="button"
                            data-resolve-ticket="${chamado.id}"
                        >
                            <i data-lucide="check-circle"></i>
                            Marcar como Resolvido
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderMobileBottomNav() {
        return `
            <nav class="mobile-bottom-nav">
                <a href="sin_financeiro.html" class="mbn-item">
                    <i data-lucide="dollar-sign"></i>
                    <span>Financeiro</span>
                </a>
                <a href="#" class="mbn-item active">
                    <i data-lucide="message-square"></i>
                    <span>Chamados</span>
                </a>
                <a href="sin_usuarios.html" class="mbn-item">
                    <i data-lucide="users"></i>
                    <span>Usuarios</span>
                </a>
            </nav>
        `;
    }

    renderToast() {
        return `
            <div class="toast" id="toast" role="status" aria-live="polite">
                <div class="toast-icon">
                    <i data-lucide="check-circle"></i>
                </div>
                <div>
                    <strong>Notificacao enviada</strong>
                    <p id="toastMessage">O morador foi notificado.</p>
                </div>
            </div>
        `;
    }

    formatarStatus(status) {
        return status === "resolvido"
            ? "Resolvido"
            : "Aberto";
    }
}
