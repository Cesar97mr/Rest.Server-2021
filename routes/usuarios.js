const {Router} = require('express');
const { usuarioGet,
        usuarioDelete, 
        usuarioPatch,
        usuarioPost, 
        usuarioPut} = require('../controllers/usuarios');

const router = Router();


router.get('/', usuarioGet);

router.post('/', usuarioPost);

router.put('/:id', usuarioPut);

router.delete('/', usuarioDelete);

router.patch('/', usuarioPatch);








module.exports = router;