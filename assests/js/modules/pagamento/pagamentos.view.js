export class PagamentosView {
    render(contexto) {
        const { usuario, pagamentos } = contexto;

        const pendente =
            pagamentos.find(
                pagamento =>
                    pagamento.status === "pendente"
            );

        return `
            ${this.renderMobileHeader(usuario)}
            ${this.renderSidebar(usuario)}

            <main class="main-wrapper">
                <header class="topbar">
                    <h2>Pagamentos</h2>
                    <p>Gerencie seus pagamentos de condominio</p>
                </header>

                <section class="content-area">
                    ${pendente ? this.renderPagamentoPendente(pendente) : ""}

                    <h3 class="history-section-title">
                        <i data-lucide="clock-3"></i>
                        Historico de Pagamentos
                    </h3>

                    <div class="history-list">
                        ${pagamentos
                            .map(
                                pagamento =>
                                    this.renderPagamentoHistorico(pagamento)
                            )
                            .join("")}
                    </div>
                </section>
            </main>

            ${this.renderMobileBottomNav()}
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
                    <a href="#" class="nav-item active">
                        <i data-lucide="file-text"></i>
                        Pagamentos
                    </a>
                    <a href="chamados.html" class="nav-item">
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

    renderPagamentoPendente(pagamento) {
        return `
            <div class="alert-card">
                <div class="alert-header">
                    <div class="alert-icon">
                        <i data-lucide="alert-triangle"></i>
                    </div>
                    <div class="alert-title">
                        <h3>Pagamento Pendente</h3>
                        <p>Vencimento: ${pagamento.vencimento}</p>
                    </div>
                </div>

                <div class="alert-value">
                    <span class="amount">${this.formatarMoeda(pagamento.valor)}</span>
                    <span class="month">${pagamento.mes}</span>
                </div>

                <button
                    class="btn-pay"
                    type="button"
                    data-download-boleto="${pagamento.id}"
                >
                    Baixar PDF do boleto
                </button>
            </div>
        `;
    }

    renderPagamentoHistorico(pagamento) {
        const estaPago =
            pagamento.status === "pago";

        return `
            <div class="history-card">
                <div class="history-card-left">
                    <div class="icon-box ${estaPago ? "paid" : "pending"}">
                        <i data-lucide="${estaPago ? "check" : "file-text"}"></i>
                    </div>
                    <div class="history-info">
                        <h4>${pagamento.mes}</h4>
                        <p>
                            ${
                                estaPago
                                    ? `Pago em ${pagamento.dataPagamento}`
                                    : `Vence em ${pagamento.vencimento}`
                            }
                        </p>
                    </div>
                </div>

                <div class="history-card-right">
                    <span class="history-amount">${this.formatarMoeda(pagamento.valor)}</span>
                    <span class="badge ${estaPago ? "paid" : "pending"}">
                        ${estaPago ? "Pago" : "Pendente"}
                    </span>
                    ${
                        !estaPago
                            ? `
                                <button
                                    class="btn-download-boleto"
                                    type="button"
                                    data-download-boleto="${pagamento.id}"
                                >
                                    Baixar boleto
                                </button>
                            `
                            : ""
                    }
                </div>
            </div>
        `;
    }

    renderMobileBottomNav() {
        return `
            <nav class="mobile-bottom-nav">
                <a href="#" class="mbn-item active">
                    <i data-lucide="file-text"></i>
                    <span>Pagamentos</span>
                </a>
                <a href="chamados.html" class="mbn-item">
                    <i data-lucide="message-square"></i>
                    <span>Chamados</span>
                </a>
            </nav>
        `;
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
