const router = require('express').Router();
const { errorMessage } = require('../../helpers/utils');
const model = require('../../models/posts.model');

router.get('/', async (req, res) => {
    try {
        const posts = await model.getAll();
        res.json(posts);
    } catch (error) {
        errorMessage(res, 500, error.message);
    }
});

router.get('/:postId', async (req, res) => {
    try {
        const post = await model.getById(req.params.postId);
        if (post === null) return errorMessage(res, 404, 'Este post no existe');
        res.json(post);
    } catch (error) {
        errorMessage(res, 500, error.message);
    }
});

router.get('/autor/:autorId', async (req, res) => {
    try {
        const posts = await model.getByAutor(req.params.autorId);
        if (posts.length === 0) return errorMessage(res, 404, 'No existen posts para este autor');
        res.json(posts);
    } catch (error) {
        errorMessage(res, 500, error.message);
    }
})

router.post('/', async (req, res) => {
    try {
        const result = await model.create(req.body);
        const postCreado = await model.getById(result.insertId);
        res.json(postCreado);
    } catch (error) {
        errorMessage(res, 500, error.message);
    }
});


module.exports = router;