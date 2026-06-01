export class Usuario {
    constructor(
        id,
        nome,
        email,
        senha,
        role,
        apartamento = null,
        ativo = true
    ) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.role = role;
        this.apartamento = apartamento;
        this.ativo = ativo;
    }
}
