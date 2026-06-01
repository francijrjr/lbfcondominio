export class UsuariosView {
    render({ usuarios, toast = null }) {
        return `
            ${this.renderMobileHeader()}
            ${this.renderSidebar()}

            <main class="main-wrapper">
                <header class="topbar">
                    <h2>Usuarios</h2>
                    <p>Gerencie quem tem acesso ao sistema</p>
                </header>

                <section class="content-area users-area">
                    <form class="user-form" id="formUsuario">
                        <div class="form-title">
                            <div>
                                <h3>Novo usuario</h3>
                                <p>Cadastre moradores ou sindicos com acesso ao sistema.</p>
                            </div>
                            <i data-lucide="user-plus"></i>
                        </div>

                        <div class="form-grid">
                            <div class="form-field">
                                <label for="nome">Nome</label>
                                <input id="nome" name="nome" type="text" required />
                            </div>

                            <div class="form-field">
                                <label for="email">Email</label>
                                <input id="email" name="email" type="email" required />
                            </div>

                            <div class="form-field">
                                <label for="senha">Senha</label>
                                <input id="senha" name="senha" type="password" required />
                            </div>

                            <div class="form-field">
                                <label for="role">Perfil</label>
                                <select id="role" name="role" required>
                                    <option value="morador">Morador</option>
                                    <option value="sindico">Sindico</option>
                                </select>
                            </div>

                            <div class="form-field">
                                <label for="apartamento">Apartamento</label>
                                <input id="apartamento" name="apartamento" type="text" placeholder="Ex: 101" />
                            </div>
                        </div>

                        <button class="btn-primary" type="submit">
                            <i data-lucide="save"></i>
                            Salvar usuario
                        </button>
                    </form>

                    <div class="users-header">
                        <h3>Usuarios cadastrados</h3>
                        <span>${usuarios.length} usuarios</span>
                    </div>

                    <div class="users-list">
                        ${usuarios.map(usuario => this.renderUsuario(usuario)).join("")}
                    </div>
                </section>
            </main>

            ${this.renderMobileBottomNav()}
            ${this.renderToast(toast)}
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
                    <a href="sin_chamados.html" class="nav-item">
                        <i data-lucide="message-square"></i>
                        <span>Chamados</span>
                    </a>
                    <a href="#" class="nav-item active">
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

    renderUsuario(usuario) {
        return `
            <article class="user-card">
                <div class="user-main">
                    <div class="user-avatar-square">
                        <i data-lucide="${usuario.role === "sindico" ? "shield" : "user"}"></i>
                    </div>
                    <div>
                        <h4>${usuario.nome}</h4>
                        <p>${usuario.email}</p>
                        <span>
                            ${usuario.role === "sindico" ? "Sindico" : `Morador - Apt ${usuario.apartamento || "-"}`}
                        </span>
                    </div>
                </div>

                <div class="user-actions">
                    <span class="status-pill ${usuario.ativo ? "active" : "inactive"}">
                        ${usuario.ativo ? "Ativo" : "Inativo"}
                    </span>
                    <button type="button" class="icon-button" data-toggle-user="${usuario.id}" title="Ativar ou desativar">
                        <i data-lucide="${usuario.ativo ? "pause-circle" : "play-circle"}"></i>
                    </button>
                    <button type="button" class="icon-button danger" data-remove-user="${usuario.id}" title="Remover usuario">
                        <i data-lucide="trash-2"></i>
                    </button>
                </div>
            </article>
        `;
    }

    renderMobileBottomNav() {
        return `
            <nav class="mobile-bottom-nav">
                <a href="sin_financeiro.html" class="mbn-item">
                    <i data-lucide="dollar-sign"></i>
                    <span>Financeiro</span>
                </a>
                <a href="sin_chamados.html" class="mbn-item">
                    <i data-lucide="message-square"></i>
                    <span>Chamados</span>
                </a>
                <a href="#" class="mbn-item active">
                    <i data-lucide="users"></i>
                    <span>Usuarios</span>
                </a>
            </nav>
        `;
    }

    renderToast(toast) {
        return `
            <div class="toast ${toast ? "show" : ""}" id="toast" role="status" aria-live="polite">
                <div class="toast-icon">
                    <i data-lucide="${toast?.type === "error" ? "x-circle" : "check-circle"}"></i>
                </div>
                <div>
                    <strong>${toast?.title || "Usuario salvo"}</strong>
                    <p id="toastMessage">${toast?.message || "Operacao concluida."}</p>
                </div>
            </div>
        `;
    }
}
