const debug = require('debug')('app:startup');
const express = require('express');
const config = require('config');
const morgan = require('morgan');

const genres = require('./routes/genres');
const movies = require('./routes/movies');

const app = express();
const Joi = require('joi');
const internal = require('stream');

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/movies', movies);

app.get('/', (request, response) => {
    response.send("Welcome to the Video Store")
})

//Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
//console.log('Mail Password: ' + config.get('mail.password')); // To get this to work: type 'set app-password=1234' in the terminal down below.


if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled');
}




//PORT 
const port = process.env.PORT || 2000;

app.listen(port, () => console.log(`Listening on port ${port}`));

