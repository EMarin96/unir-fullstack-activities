const { executeQuery, executeQueryOne } = require('../helpers/utils');

const getAll = () => {
    return executeQuery('SELECT p.id, p.titulo, p.descripcion, date_format(p.fecha_creacion, "%d/%c/%Y %h:%i %p") as fecha_creacion, a.nombre as autor, a.email, a.imagen FROM posts p JOIN autores a ON a.id = p.autores_id');
};

const getById = (postId) => {
    return executeQueryOne('SELECT p.id, p.titulo, p.descripcion, date_format(p.fecha_creacion, "%d/%c/%Y %h:%i %p") as fecha_creacion, a.nombre as autor, a.email, a.imagen FROM posts p JOIN autores a ON a.id = p.autores_id WHERE p.id = ?', [postId]);
}

const getByAutor = (autorId) => {
    return executeQuery('SELECT id, titulo, descripcion, date_format(fecha_creacion, "%d/%c/%Y %h:%i %p") as fecha_creacion FROM posts WHERE autores_id = ?', [autorId]);
}

const create = ({ titulo, descripcion, autores_id }) => {
    return executeQuery('INSERT INTO posts (titulo, descripcion, autores_id) VALUES (?, ?, ?)', [titulo, descripcion, autores_id]);
};

module.exports = {
    getAll,
    getById,
    getByAutor,
    create
}