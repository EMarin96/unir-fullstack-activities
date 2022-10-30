const router = require('express').Router();
const Inmuebles = require('../../models/inmueble.model');

router.get('/', async (req, res) => {
    try {
        const inmuebles = await Inmuebles.find();
        res.json(inmuebles);
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.get('/:inmuebleId', async (req, res) => {
    try {
        const inmueble = await Inmuebles.findById(req.params.inmuebleId);
        if (inmueble === null) return res.status(404).json({ error: 'Este inmueble no existe' });
        res.json(inmueble);
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const inmuebleAdd = await Inmuebles.create(req.body);
        res.json(inmuebleAdd);
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.put('/:inmuebleId', async (req, res) => {
    try {
        const { inmuebleId } = req.params;
        const inmuebleMod = await Inmuebles.findByIdAndUpdate(inmuebleId, req.body, { new: true });
        if (inmuebleMod === null) return res.status(404).json({ error: 'Este inmueble no existe' });
        res.json(inmuebleMod);
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.delete('/:inmuebleId', async (req, res) => {
    try {
        const { inmuebleId } = req.params;
        const inmuebleDel = await Inmuebles.findByIdAndRemove(inmuebleId);
        if (inmuebleDel === null) return res.status(404).json({ error: 'Este inmueble no existe' });
        res.json(inmuebleDel);
    } catch (error) {
        res.json({ error: error.message });
    }
});

module.exports = router;