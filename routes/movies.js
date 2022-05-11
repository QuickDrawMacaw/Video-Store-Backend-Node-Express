const express = require('express');
const Joi = require('joi');
const router = express.Router();

const movies = [
    {id: 1, title: "Terminator 2", genre:'Action' },
    {id: 2, title: "Die Hard", genre:'Action' },
    {id: 3, title: "Collateral", genre:'Action' },
    {id: 4, title: "Texas Chainsaw Massacre", genre:'Horror' },
    {id: 5, title: "No Country for Old Men", genre:'Thriller' },
]



router.get('/', (request, response) => {
    response.send(movies);
})

router.get('/:id', (request, response) => {
    const movie = movies.find(m => m.id === parseInt(request.params.id))
    if(!movie) return response.status(404).send('The movie with the given id was not found');
    response.send(movie);
})


router.post('/', (request, response) => {
    const { error } = validateMovie( request.body );
    if(error) return response.status(400).send(error.details[0].message);

    const movie = {
        id: movies.length + 1,
        title: request.body.title,
        genre: request.body.genre
    };
    movies.push(movie);
    response.send(movie);
})

router.put('/:id', (request, response) => {
    const movie = movies.find(m => m.id === parseInt(request.params.id))
    if(!movie) return response.status(404).send('The movie with the given id was not found');

    const { error } = validateMovie(request.body);
    if(error) return response.status(404).send(error.details[0].message)

    movie.title = request.body.title;
    movie.genre = request.body.genre;
    response.send(movie);
})

router.delete('/:id', (request, response) => {
    const movie = movies.find(m => m.id === parseInt(request.params.id))
    if(!movie) return response.status(404).send('The movie with the given id was not found');

    const index = movies.indexOf(movie);
    movies.splice(index, 1);

    response.send(movie); 
})

function validateMovie(movie){
    const schema = Joi.object({
        title: Joi.string()
            .min(3)
            .required(),
        genre: Joi.string()
            .min(3)
            .required(),
    });

    return schema.validate(movie); 
}

module.exports = router;