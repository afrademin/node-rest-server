const jwt = require('jsonwebtoken');

//===============================
// Verificacion de token
//===============================


let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            })
        }

        req.usuario = decoded.usuario;
        next();


    });

    /* res.json({
        token
    }); */

    //next();
};

//===============================
// Verificacion de token (ADMIN_ROLE)
//===============================

let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
        return;
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }
};

/* res.json({
    token
}); */

//next();

//===============================
// Verificacion de token desde url
//===============================

let verificaTokenimg = (req, res, next) => {
    let token = req.query.token;

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            })
        }

        req.usuario = decoded.usuario;
        next();


    });
}



module.exports = {
    verificaToken,
    verificaAdmin_Role,
    verificaTokenimg
}