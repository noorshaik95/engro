let movies = require('./movies/index')
module.exports = {
    loadControllers
}

function loadControllers(app) {
    app.use('/movies', movies);
}