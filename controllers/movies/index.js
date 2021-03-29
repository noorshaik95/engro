let express = require('express');
let router = express.Router();
let moviesController = require('./movies')

router.post('/', async (req, res, next) => {
    try {
        if (!req.body.title) {
            throw new Error("Title is required")
        }
        let response = await moviesController.addMovieDetails(req.body);
        res.json({ status: true, data: response });
    } catch (ex) {
        next(ex)
    }
});

router.get('/', async (req, res, next) => {
    try {
        if (!req.query.title) {
            throw new Error("Title is required")
        }
        let response = await moviesController.getMovieDetails(req.query.title);
        res.json({ status: true, data: response });
    } catch (ex) {
        next(ex)
    }
});

router.put('/', async (req, res, next) => {
    try {
        if (!req.query.title) {
            throw new Error("Title is required")
        }
        await moviesController.updateMovieDetails(req.query.title, req.body);
        res.json({ status: true, data: "Updated Successfully!" });
    } catch (ex) {
        next(ex)
    }
});

router.delete('/', async (req, res, next) => {
    try {
        if (!req.query.title) {
            throw new Error("Title is required")
        }
        await moviesController.deleteMovieDetails(req.query.title);
        res.json({ status: true, data: "Deleted Successfully!" });
    } catch (ex) {
        next(ex)
    }
});

router.get('/genre', async (req, res, next) => {
    try {
        const response = await moviesController.getMoviesCountByGenre();
        res.json({ status: true, data: response });
    } catch (ex) {
        next(ex)
    }
});

router.get('/year', async (req, res, next) => {
    try {
        const response = await moviesController.getMoviesCountByYear();
        res.json({ status: true, data: response });
    } catch (ex) {
        next(ex)
    }
});

module.exports = router;
