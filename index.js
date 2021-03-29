require('app-module-path').addPath(__dirname);
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json({ limit: '5mb' }));

app.use(express.urlencoded({ limit: '5mb', extended: true }));

app.use(cors());

app.set('port', 5000);

require('./controllers/index').loadControllers(app);

app.use(appErrorHandling);

function appErrorHandling(err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500).send({ status: false, message: err.message });
};

app.listen(app.get('port'), function () {
    console.log("Server listening on port %d", app.get('port'));
});
