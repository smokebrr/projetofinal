const jwt = require('jsonwebtoken');

function autenticar(req, res, next) {
    const authHeader = req.headers['authorization']; 

    if (!authHeader) {
        return res.status(403).json({ message: 'Token não fornecido' });
    }

   
    const token = authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(403).json({ message: 'Token não fornecido' });
    }

    jwt.verify(token, 'segredo', (erro, decoded) => {
        if (erro) {
            return res.status(401).json({ message: 'Token inválido' });
        }

      
        req.usuarioId = decoded.id;
        next(); 
    });
    
}

module.exports = autenticar;
