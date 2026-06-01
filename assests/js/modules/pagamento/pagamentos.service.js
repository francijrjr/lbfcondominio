import { Pagamento } from "./pagamentos.model.js";

export class PagamentosService {

    listar(){

        return [

            new Pagamento(
                "Abril 2026",
                850,
                "pendente",
                "05/05/2026"
            ),

            new Pagamento(
                "Março 2026",
                850,
                "pago",
                "05/04/2026",
                "03/04/2026"
            ),

            new Pagamento(
                "Fevereiro 2026",
                850,
                "pago",
                "05/03/2026",
                "02/03/2026"
            )

        ];

    }

}