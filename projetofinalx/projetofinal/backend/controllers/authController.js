const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../structure/conection'); 

const JWT_SECRET = '123456'; 


exports.register = async (req, res) => {
    const { nome, senha, email, tipo_usuario = 'usuario' } = req.body;


    if (!nome || !senha || !email) {
        return res.status(400).json({ error: 'Nome, email e senha são obrigatórios!' });
    }

  
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao verificar o usuário!' });
        }

        if (result.length > 0) {
            return res.status(409).json({ error: 'Usuário já existe!' });
        }

        try {
      
            const hashedPassword = await bcrypt.hash(senha, 10);

        
            db.query('INSERT INTO users (nome, email, senha, tipo_usuario) VALUES (?, ?, ?, ?)', 
                [nome, email, hashedPassword, tipo_usuario], (err, result) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: 'Erro ao registrar usuário!' });
                    }
                    return res.status(201).json({ message: 'Usuário registrado com sucesso!' });
                }
            );
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao hash da senha!' });
        }
    });
};

exports.login = async (req, res) => {
    const { email, senha } = req.body;


    if (!email || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios!' });
    }

  
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao verificar o usuário!' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado!' });
        }

        const user = result[0];

        try {
          
            const isPasswordValid = await bcrypt.compare(senha, user.senha);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Senha inválida!' });
            }

          
            const token = jwt.sign({ usuario_id: user.usuario_id, nome: user.nome, tipo_usuario: user.tipo_usuario }, JWT_SECRET, { expiresIn: '1h' });

           
            return res.status(200).json({ message: 'Autenticado com sucesso!', token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro interno no servidor!' });
        }
    });
};


exports.protected = (req, res) => {
    const authHeader = req.headers['authorization'];


    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido!' });
    }

    const token = authHeader.split(' ')[1]; 

   
    if (!token) {
        return res.status(401).json({ error: 'Formato de token inválido!' });
    }

    try {

        const decoded = jwt.verify(token, JWT_SECRET);
        return res.status(200).json({ message: 'Acesso concedido!', user: decoded });
    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: 'Token inválido!' });
    }
};
