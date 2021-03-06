const {Router} = require('express');
const {check} = require('express-validator');
const Role = require('../models/role')

const {
    validarCampos,
    validarJWT,
     tieneRole,
    esAdminRole
} = require('../middlewares')

const { usuarioGet,
        usuarioDelete, 
        usuarioPatch,
        usuarioPost, 
        usuarioPut} = require('../controllers/usuarios');

const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');


const router = Router();

router.get('/', usuarioGet);

//El check forma parte de los middlewares y va verificando que cada uno cumpla su funcion
router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 letras').isLength({min:6}),
    check('correo').custom(emailExiste),
    //check('rol', 'No es un Rol Valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
], usuarioPost);

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),

    validarCampos
], usuarioPut);

router.delete('/:id',[
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuarioDelete);

router.patch('/', usuarioPatch);








module.exports = router;