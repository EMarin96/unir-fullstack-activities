const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Obtencion de inmuebles');
});

router.post('/', (req, res) => {
    res.send('Creación de inmuebles');
});

router.put('/', (req, res) => {
    res.send('Actualización de inmuebles');
});

router.delete('/', (req, res) => {
    res.send('Eliminación de inmuebles');
});

module.exports = router;