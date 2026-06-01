import { MockData } from "../../data/mock-data.js";
import { Usuario } from "./usuarios.model.js";

const STORAGE_KEY = "lbfcondominio.usuarios";

export class UsuariosService {
    listar() {
        return this
            .lerStorage()
            .map(
                usuario =>
                    new Usuario(
                        usuario.id,
                        usuario.nome,
                        usuario.email,
                        usuario.senha,
                        usuario.role,
                        usuario.apartamento,
                        usuario.ativo
                    )
            );
    }

    criar(data) {
        const usuarios =
            this.lerStorage();

        const emailExiste =
            usuarios.some(
                usuario =>
                    usuario.email.toLowerCase() === data.email.trim().toLowerCase()
            );

        if (emailExiste) {
            throw new Error("Ja existe um usuario com este email.");
        }

        const usuario = {
            id: `user-${Date.now()}`,
            nome: data.nome.trim(),
            email: data.email.trim(),
            senha: data.senha.trim(),
            role: data.role,
            apartamento: data.role === "morador"
                ? data.apartamento.trim()
                : null,
            ativo: true
        };

        this.salvarStorage([
            usuario,
            ...usuarios
        ]);

        return usuario;
    }

    alternarStatus(id) {
        const usuarios =
            this.lerStorage().map(
                usuario =>
                    usuario.id === id
                        ? {
                            ...usuario,
                            ativo: !usuario.ativo
                        }
                        : usuario
            );

        this.salvarStorage(usuarios);
    }

    remover(id) {
        const usuarios =
            this
                .lerStorage()
                .filter(
                    usuario =>
                        usuario.id !== id
                );

        this.salvarStorage(usuarios);
    }

    lerStorage() {
        const dados =
            localStorage.getItem(STORAGE_KEY);

        if (!dados) {
            this.salvarStorage(MockData.usuarios);
            return MockData.usuarios;
        }

        try {
            return JSON.parse(dados);
        } catch {
            this.salvarStorage(MockData.usuarios);
            return MockData.usuarios;
        }
    }

    salvarStorage(usuarios) {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(usuarios)
        );
    }
}
