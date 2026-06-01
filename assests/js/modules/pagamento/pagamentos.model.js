export class Pagamento {
    constructor(
        id,
        mes,
        valor,
        status,
        vencimento,
        dataPagamento = null,
        boleto = null
    ) {
        this.id = id;
        this.mes = mes;
        this.valor = valor;
        this.status = status;
        this.vencimento = vencimento;
        this.dataPagamento = dataPagamento;
        this.boleto = boleto;
    }
}
