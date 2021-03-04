const {response} = require('express');



//Funciones para separar el controlador de rutas y enviarselo a las rutas
//para asi simplificar y estructurar el codigo
const usuarioGet = (req = request, res= response) => {
    
    const {q, nombre = 'No Name', apikey} = req.query;
    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey
    });
}

const usuarioPost = (req, res= response) => {
    
    const body = req.body;

    res.json({
        msg: 'post API - controlador',
        body
    });
}

const usuarioPut = (req, res= response) => {
    
    const id = req.params.id;
    res.json({
        msg: 'put API - controlador',
        id
    });
}

const usuarioDelete = (req, res= response) => {
    
    res.json({
        msg: 'delete API - controlador'
    });
}

const usuarioPatch = (req, res= response) => {
    
    res.json({
        msg: 'patch API - controlador'
    });
}





module.exports = {
    usuarioGet,
    usuarioDelete,
    usuarioPatch,
    usuarioPost,
    usuarioPut
}