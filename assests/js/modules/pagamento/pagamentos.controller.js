import {
    PagamentosService
}
from "./pagamentos.service.js";

import {
    PagamentosView
}
from "./pagamentos.view.js";

const service =
    new PagamentosService();

const view =
    new PagamentosView();

const pagamentos =
    service.listar();

document
    .getElementById("app")
    .innerHTML =
        view.render(pagamentos);

lucide.createIcons();