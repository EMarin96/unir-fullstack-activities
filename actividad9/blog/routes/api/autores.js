const router = require('express').Router();
const model = require('../../models/autores.model');
const { errorMessage } = require('../../helpers/utils');

router.get('/', async (req, res) => {
    try {
        const autores = await model.getAll();
        res.json(autores);
    } catch (error) {
        errorMessage(res, 500, error.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const autor = await model.getById(req.params.id);
        if (autor === null) return errorMessage(res, 404, 'Este autor no existe');
        res.json(autor);
    } catch (error) {
        errorMessage(res, 500, error.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await model.create(req.body);
        const autorCreado = await model.getById(result.insertId);
        res.json(autorCreado);
    } catch (error) {
        errorMessage(res, 500, error.message);
    }
})

module.exports = router;