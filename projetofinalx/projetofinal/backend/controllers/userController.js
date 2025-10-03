const userModel = require("../models/userModel");

class UserController {

    listar(req, res) {
        userModel.listar()
            .then(users => {
                res.status(200).json(users); 
            })
            .catch(error => {
                res.status(500).json({ message: error.message }); 
            });
    }

   
    criar(req, res) {
        const { email, senha, tipo_usuario } = req.body;

        if (!email || !senha || !tipo_usuario) {
            return res.status(400).json({ message: 'Email, senha e tipo de usuário são obrigatórios' });
        }

        const novoUser = req.body;

        userModel.criar(novoUser)
            .then(() => {
                res.status(201).json({ message: 'Usuário criado com sucesso' });
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    }


    alterar(req, res) {
        const { id } = req.params;
        const dadosAtualizados = req.body;

 
        if (!dadosAtualizados || Object.keys(dadosAtualizados).length === 0) {
            return res.status(400).json({ message: 'Dados para atualização são obrigatórios' });
        }

        userModel.atualizar(dadosAtualizados, id)
            .then(() => {
                res.status(200).json({ message: 'Usuário atualizado com sucesso' });
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    }

    deletar(req, res) {
        const { id } = req.params;

     
        if (!id) {
            return res.status(400).json({ message: 'ID do usuário é necessário' });
        }

        userModel.delete(id)
            .then(() => {
                res.status(200).json({ message: 'Usuário deletado com sucesso' });
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    }


    async login(req, res) {
        const { email, senha, tipo_usuario } = req.body;


        if (!email || !senha || !tipo_usuario) {
            return res.status(400).json({ message: 'Email, senha e tipo de usuário são obrigatórios' });
        }

        try {
            const { token, usuario } = await userModel.autenticar(email, senha, tipo_usuario);
            res.status(200).json({
                token,
                tipo_usuario: usuario.tipo_usuario,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new UserController();
