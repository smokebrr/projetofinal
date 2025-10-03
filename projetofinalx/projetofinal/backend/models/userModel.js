const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const conexao = require("../structure/conection");

class UserModel {
    
    async executaQuery(sql, parametros = []) {
        return new Promise((resolve, reject) => {
            conexao.query(sql, parametros, (error, resposta) => {
                if (error) {
                    return reject(new Error(`Erro na consulta: ${error.message}`));
                }
                resolve(resposta);
            });
        });
    }


    async listar() {
        try {
            const sql = "SELECT * FROM users";
            const usuarios = await this.executaQuery(sql);
            return usuarios;
        } catch (error) {
            throw new Error(`Erro ao listar os usuários: ${error.message}`);
        }
    }

    async criar(novoUsuario) {
        try {
            const { senha } = novoUsuario;
            const senhaHash = await bcrypt.hash(senha, 10);
            const sql = "INSERT INTO users SET ?";
            const resultado = await this.executaQuery(sql, [
                { ...novoUsuario, senha: senhaHash },
            ]);
            return resultado;
        } catch (error) {
            throw new Error(`Erro ao criar o usuário: ${error.message}`);
        }
    }

    
    async atualizar(dadosAtualizados, usuarioId) {
        try {
            if (dadosAtualizados.senha) {
                dadosAtualizados.senha = await bcrypt.hash(
                    dadosAtualizados.senha,
                    10
                );
            }
            const sql = "UPDATE users SET ? WHERE usuario_id = ?";
            const resultado = await this.executaQuery(sql, [
                dadosAtualizados,
                usuarioId,
            ]);
            return resultado;
        } catch (error) {
            throw new Error(`Erro ao atualizar o usuário: ${error.message}`);
        }
    }


    async delete(usuarioId) {
        try {
            const sql = "DELETE FROM users WHERE usuario_id = ?";
            const resultado = await this.executaQuery(sql, [usuarioId]);
            return resultado;
        } catch (error) {
            throw new Error(`Erro ao deletar o usuário: ${error.message}`);
        }
    }


    async autenticar(email, senha, tipo_usuario) {
        const sql = "SELECT * FROM users WHERE email = ? AND tipo_usuario = ?";
        const usuarios = await this.executaQuery(sql, [email, tipo_usuario]);

        if (usuarios.length === 0) {
            throw new Error("Usuário não encontrado");
        }

        const usuario = usuarios[0];
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            throw new Error("Senha incorreta");
        }

        const token = jwt.sign(
            {
                id: usuario.usuario_id,
                email: usuario.email,
                tipo_usuario: usuario.tipo_usuario,
            },
            process.env.JWT_SECRET || "segredo",
            { expiresIn: "24h" }
        );

        return { token, usuario };
    }
}

module.exports = new UserModel();
