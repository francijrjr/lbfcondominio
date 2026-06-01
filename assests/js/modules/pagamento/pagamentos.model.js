export class Pagamento {

    constructor(
        mes,
        valor,
        status,
        vencimento,
        dataPagamento = null
    ){

        this.mes = mes;
        this.valor = valor;
        this.status = status;
        this.vencimento = vencimento;
        this.dataPagamento = dataPagamento;

    }

}