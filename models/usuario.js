
const {Schema, model} = require('mongoose')

const UsuarioSchema = Schema({

    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    correo:{
        type:String,
        required: [true, 'El correo es obligatorio'],
        unique:true
    },
    password: {
        type: String,
        required:[true, 'La contraseña es obligatoria'],
    },
    img:{
        type:String
    },
    rol:{
        type:String,
        require:true,
        emun: ['ADMIN_ROLE', 'USER_ROLE','VENTAS_ROLE']
    },
    estado: {
        type:Boolean,
        default: true
    },
    google:{
        type:Boolean,
        default: false
    },

});

//Metodos  personalizados 

UsuarioSchema.methods.toJSON = function(){
    const  {__v, password, ...usuario} = this.toObject();
    return usuario;
}


module.exports = model('User', UsuarioSchema);