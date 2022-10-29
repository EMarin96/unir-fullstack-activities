const executeQuery = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (error, result) => {
            if (error) return reject(error);
            resolve(result);
        });
    });
};

const executeQueryOne = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (error, result) => {
            if (error) return reject(error);
            if (result.length === 0) return resolve(null);
            resolve(result[0]);
        });
    });
};

const errorMessage = (res, statusCode, message) => {
    return res.status(statusCode).json({ error: message });
};

module.exports = {
    executeQuery,
    executeQueryOne,
    errorMessage
}