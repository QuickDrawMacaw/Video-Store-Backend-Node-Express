const express = require('express');
const Joi = require('joi');
const router = express.Router();

const genres = [ 
    {id: 1, name: 'Action'}, 
    {id: 2, name: 'Comedy'}, 
    {id: 3, name: 'Drama'}, 
    {id: 4, name: 'Horror'}, 
    {id: 5, name: 'Romance'}, 
    {id: 6, name: 'Thriller'}, 
];

router.get('/', (request, response) => {
    response.send(genres);
})

router.get('/:id', (request, response) => {
    const genre = genres.find(g => g.id === parseInt(request.params.id))
    if(!genre) return response.status(404).send('The movie with the given id was not found');
    response.send(genre);
})

router.post('/', (request, response) => {
    const { error } = validateGenre( request.body );
    if(error) return response.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: request.body.name
    };
    genres.push(genre);
    response.send(genre);
})

router.put('/:id', (request, response) => {
    const genre = genres.find(g => g.id === parseInt(request.params.id))
    if(!genre) return response.status(404).send('The genre with the given id was not found');

    const { error } = validateGenre(request.body);
    if(error) return response.status(404).send(error.details[0].message)

    genre.name = request.body.name;
    response.send(genre);
})

router.delete('/:id', (request, response) => {
    const genre = genres.find(g => g.id === parseInt(request.params.id))
    if(!genre) return response.status(404).send('The genre with the given id was not found');

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    response.send(genre); 
})

function validateGenre(genre){
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .required()

    });

    return schema.validate(genre); 
}

module.exports = router;