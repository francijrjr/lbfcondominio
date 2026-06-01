export class ChamadosView {
    render({ usuario, chamados }) {
        return `
            ${this.renderMobileHeader(usuario)}
            ${this.renderSidebar(usuario)}

            <main class="main-wrapper">
                <header class="topbar">
                    <h2>Chamados</h2>
                    <p>Abra e acompanhe seus chamados</p>
                </header>

                <section class="content-area">
                    <button class="btn-new-ticket" type="button" data-open-form>
                        <i data-lucide="plus"></i>
                        Novo Chamado
                    </button>

                    <div class="form-card" id="formNovoChamado">
                        <h3>Criar Chamado</h3>
                        <form id="formChamado">
                            <div class="form-group">
                                <label for="titulo">Titulo</label>
                                <input
                                    type="text"
                                    id="titulo"
                                    name="titulo"
                                    class="form-input"
                                    placeholder="Ex: Vazamento no apartamento"
                                    required
                                />
                            </div>

                            <div class="form-group">
                                <label for="descricao">Descricao</label>
                                <textarea
                                    id="descricao"
                                    name="descricao"
                                    class="form-textarea"
                                    placeholder="Descreva o problema..."
                                    required
                                ></textarea>
                            </div>

                            <div class="form-actions">
                                <button type="submit" class="btn-submit">Enviar</button>
                                <button type="button" class="btn-cancel" data-close-form>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>

                    <h3 class="section-title">
                        <i data-lucide="message-square"></i>
                        Meus Chamados
                    </h3>

                    <div class="tickets-list">
                        ${chamados.length
                            ? chamados.map(chamado => this.renderChamado(chamado)).join("")
                            : this.renderVazio()
                        }
                    </div>
                </section>
            </main>

            ${this.renderMobileBottomNav()}
            ${this.renderToast()}
        `;
    }

    renderMobileHeader(usuario) {
        return `
            <header class="mobile-header">
                <div class="mh-left">
                    <img src="../assests/img/logo.png" alt="Logo LBF" />
                    <div class="mh-user-info">
                        <h2>${usuario.nome}</h2>
                        <p>Apartamento ${usuario.apartamento}</p>
                    </div>
                </div>
                <a href="login.html" class="mh-logout">
                    <i data-lucide="log-out"></i>
                    <span>Sair</span>
                </a>
            </header>
        `;
    }

    renderSidebar(usuario) {
        return `
            <aside class="sidebar">
                <div class="sidebar-header">
                    <img src="../assests/img/logo.png" alt="Logo CondoApp" />
                    <div class="brand-info">
                        <h1>${usuario.nome}</h1>
                        <span>Area do Morador</span>
                    </div>
                </div>

                <nav class="sidebar-nav">
                    <a href="pagamentos.html" class="nav-item">
                        <i data-lucide="file-text"></i>
                        Pagamentos
                    </a>
                    <a href="#" class="nav-item active">
                        <i data-lucide="message-square"></i>
                        Chamados
                    </a>
                </nav>

                <div class="sidebar-footer">
                    <a href="login.html" class="nav-item">
                        <i data-lucide="log-out"></i>
                        Sair
                    </a>
                </div>
            </aside>
        `;
    }

    renderChamado(chamado) {
        return `
            <div class="ticket-card">
                <div class="ticket-header">
                    <div class="ticket-icon">
                        <i data-lucide="message-square"></i>
                    </div>
                    <div class="ticket-header-content">
                        <h3>${chamado.titulo}</h3>
                        <p>${chamado.dataAbertura}</p>
                    </div>
                    <span class="ticket-badge">${this.formatarStatus(chamado.status)}</span>
                </div>
                <p class="ticket-description">${chamado.descricao}</p>
                <div class="ticket-footer">
                    <div class="ticket-status">
                        <span class="status-dot"></span>
                        ${this.formatarStatus(chamado.status)}
                    </div>
                </div>
            </div>
        `;
    }

    renderVazio() {
        return `
            <div class="ticket-card">
                <p class="ticket-description">Voce ainda nao abriu nenhum chamado.</p>
            </div>
        `;
    }

    renderMobileBottomNav() {
        return `
            <nav class="mobile-bottom-nav">
                <a href="pagamentos.html" class="mbn-item">
                    <i data-lucide="file-text"></i>
                    <span>Pagamentos</span>
                </a>
                <a href="#" class="mbn-item active">
                    <i data-lucide="message-square"></i>
                    <span>Chamados</span>
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
                    <strong>Chamado salvo</strong>
                    <p id="toastMessage">Seu chamado foi enviado ao sindico.</p>
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
