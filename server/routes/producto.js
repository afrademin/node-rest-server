const express = require('express');

let { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

let app = express();

let Producto = require('../models/producto');



// ==============================
//  Obtener productos
// ==============================
app.get('/productos', verificaToken, (req, res) => {
    // Trae todos los productos
    // populate: usuario categoria
    // paginado

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Producto.find({ disponible: true })
        .skip(desde)
        .limit(limite)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos: productoDB
            })



        });

});


// ==============================
//  Obtener producto por id
// ==============================
app.get('/productos/:id', verificaToken, (req, res) => {
    // populate: usuario categoria
    // id

    let id = req.params.id;

    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'ID no existe'
                    }
                });
            }
            res.json({
                ok: true,
                producto: productoDB
            })
        });
});



// ==============================
//  Buscar producto
// ==============================
app.get('/productos/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex })
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Sin resultados'
                    }
                });
            }

            if (productoDB.length == 0) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Sin resultados'
                    }
                });
            }


            res.json({
                ok: true,
                producto: productoDB
            })
        });

});














// ==============================
//  Crear un producto
// ==============================
app.post('/productos', verificaToken, (req, res) => {
    // Grabar el usuario
    // Grabar una categoria

    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: Number(body.precioUni),
        descripcion: body.descripcion,
        disponible: Boolean(body.disponible),
        categoria: body.categoria,
        usuario: req.usuario._id
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            producto: productoDB
        })
    });
});


// ==============================
//  Actualizar un producto
// ==============================
app.put('/productos/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let dispProducto = {
        nombre: body.nombre,
        precioUni: Number(body.precioUni),
        descripcion: body.descripcion,
        categoria: body.categoria,
        disponible: body.disponible
    };

    Producto.findByIdAndUpdate(id, dispProducto, { new: true, runValidators: true }, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'ID no existe'
                }
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        })

    });


});


// ==============================
//  Borrar un producto
// ==============================
app.delete('/productos/:id', verificaToken, (req, res) => {
    // Disponible: true -> false

    let id = req.params.id;
    let body = req.body;

    let dispProducto = {
        disponible: Boolean(body.disponible)
    };

    Producto.findByIdAndUpdate(id, dispProducto, { new: true, runValidators: true }, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'ID no existe'
                }
            });
        }

        res.json({
            ok: true,
            producto: productoDB,
            message: 'Producto borrado satisfactoriamente'
        });

    });

});



module.exports = app;