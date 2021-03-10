const {response, request} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { validationResult } = require('express-validator');
const usuario = require('../models/usuario');



//Funciones para separar el controlador de rutas y enviarselo a las rutas
//para asi simplificar y estructurar el codigo
const usuarioGet = async (req = request, res= response) => {
    
    //const {q, nombre = 'No Name', apikey} = req.query;
    const { limite = 5, desde = 0} = req.query;
    const query = {estado: true};
    /* const usuarios = await Usuario.find({estado : true})
        .skip(Number(desde))
        .limit(Number(limite));

    const total = await Usuario.countDocuments({estado:true}); */


    //Usamos de esta manera mejor porque asi optimizamos el tiempo de respuesta de las promesas ya que 
    //en la primera funcion una tiene que esperar a la otra cuando no depende de ella aqui ambas se ejecutan
    //pero solo compila cuando ambas promesas son correctas, usamos desestructuracion para poner detallar los datos
    const [total, usuarios] = Promise.all([
        Usuario.count(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.json({
        total,
        usuarios
    });
}

const usuarioPost = async (req, res= response) => {


    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    // Verificar si el correo existe

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //guardar en DB
    await usuario.save();

    res.json({
        usuario
    });
}

const usuarioPut = async (req, res= response) => {
    
    const {id} = req.params;
    const {password, google, correo, ...resto} = req.body;

    //Todo validar contra base de datos
    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}

const usuarioDelete = async (req, res= response) => {
    
    const { id } = req.params;

    //Fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});    
    res.json(usuario);
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