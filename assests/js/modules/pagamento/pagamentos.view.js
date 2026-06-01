export class PagamentosView {

    render(pagamentos) {

        const pendente =
            pagamentos.find(
                pagamento =>
                    pagamento.status === "pendente"
            );

        return `

        <div class="layout">

            <aside class="sidebar">

                <div class="sidebar-header">

                    <img
                        src="../assests/img/logo.png"
                        class="logo"
                    >

                    <div>

                        <h2>CondoApp</h2>

                        <small>
                            Área do Morador
                        </small>

                    </div>

                </div>

                <nav>

                    <a
                        class="menu-item active"
                    >

                        <i data-lucide="credit-card"></i>

                        Pagamentos

                    </a>

                    <a
                        class="menu-item"
                    >

                        <i data-lucide="message-square"></i>

                        Chamados

                    </a>

                </nav>

                <button
                    class="logout"
                >

                    <i data-lucide="log-out"></i>

                    Sair

                </button>

            </aside>

            <main class="content">

                <header>

                    <h1>
                        Pagamentos
                    </h1>

                    <span>
                        Gerencie seus pagamentos
                    </span>

                </header>

                <section
                    class="pending-card"
                >

                    <div
                        class="pending-title"
                    >

                        <i data-lucide="alert-circle"></i>

                        Pagamento Pendente

                    </div>

                    <small>

                        Vencimento:
                        ${pendente.vencimento}

                    </small>

                    <h2>

                        R$ ${pendente.valor}

                    </h2>

                    <span>

                        ${pendente.mes}

                    </span>

                    <button>

                        Pagar Condomínio

                    </button>

                </section>

                <section>

                    <h3>

                        Histórico de Pagamentos

                    </h3>

                    <div class="payments-list">

                        ${pagamentos.map(
                            pagamento => `

                            <div
                                class="payment-item"
                            >

                                <div>

                                    <strong>

                                        ${pagamento.mes}

                                    </strong>

                                    <small>

                                        ${
                                            pagamento.status === "pago"
                                            ?
                                            `Pago em ${pagamento.dataPagamento}`
                                            :
                                            `Vence em ${pagamento.vencimento}`
                                        }

                                    </small>

                                </div>

                                <div
                                    class="payment-right"
                                >

                                    <strong>

                                        R$ ${pagamento.valor}

                                    </strong>

                                    <span
                                        class="${pagamento.status}"
                                    >

                                        ${pagamento.status}

                                    </span>

                                </div>

                            </div>

                        `
                        ).join("")}

                    </div>

                </section>

            </main>

        </div>

        `;

    }

}