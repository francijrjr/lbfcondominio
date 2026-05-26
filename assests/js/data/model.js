class Model {
    static create(data){
        return {
            id: this.generateId(),
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
    static generateId(){
        return 'id_' + Math.random().toString(36).substr(2, 9);
    }
}

class Morador extends Model {
  static validate(data) {
    const errors = {};

    if (!data.nome || data.nome.trim() === '') {
      errors.nome = 'Nome é obrigatório';
    }
    if (!data.apartamento || data.apartamento.trim() === '') {
      errors.apartamento = 'Apartamento é obrigatório';
    }
    if (!data.email || !this.isValidEmail(data.email)) {
      errors.email = 'Email inválido';
    }
    if (!data.cpf || !this.isValidCPF(data.cpf)) {
      errors.cpf = 'CPF inválido';
    }
    return Object.keys(errors).length === 0 ? null : errors;
  }

  static isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  static isValidCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    return cpf.length === 11;
  }
}