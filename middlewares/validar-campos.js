const {validationResult} = require('express-validator');

const validarCampos = (req, res, next) => {

//Verificar si algun middleware lanza algun error y detiene el proceso o continua
const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json(errors)
}

next();
}

module.exports = {
    validarCampos
}