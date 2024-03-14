const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const uuid = require('uuid');

app.use(bodyParser.json());

//morgan logging 
let myLogger = (req, res, next) => {
    console.log(req.url);
    next();
  };
app.use(myLogger);

//Error Catcher
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

//movie database ( I have seen maybe 10 movies in my life?)
let movies = [
    {
      'Title': 'Harry Potter and the Sorcerer\'s Stone',
      'Genre' : { 
        'Name' : 'fantasy',
        'Description': 'not real. fiction. we made it up.'
      },
      'Director': {
        'Name' : 'Chris Columbus',
        'Bio' : 'A british dude probably',
        'Birth' : 'happened.'
      }
    },
    {
      'Title' : 'Lord of the Rings',
      'genre' : { 
        'Name' : 'fantasy',
        'Description': 'not real. fiction. we made it up.'
      },
      'Director' : {
         'Name' : 'Peter Jackson',
         'Bio' : 'Austrailian? What\'s next to Australia?',
         'Birth' : ' Unconfirmed.'
      }
    },
    {
      'Bitle' : 'Twilight',
      'Genre' : {
        'Name' : 'Non-Fiction',
        'description' : 'You better belive in vampire sparkles, because you\'re seein\' one!'
      },
      'Director' : {
        'Name' : 'Stephanie Meyer',
        'Bio' : 'Holy farts. An actual real vampire',
        'Birth' : 'Rapidly approaching.'
      }
    }
  ];
  
// user database. For using I assume
let users = [
  {
    id: 1,
    name:'Big G',
    foriteMovies:[]
  },
  {
    id: 2,
    name: 'Little B',
    favoriteMovies: ['Harry Potter and the Sorcerer\'s Stone']
  }
]

//Delete requets. Requests? Yeah.
app.delete('/users/:id/:movieTitle', (req,res) =>{
  const { id,movieTitle } = req.params;

  let user = users.find( user => user.id == id );

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
    res.status(200).send('Good. Movies are cringe anyways. ${movieTitle} is gone from ${id}\'s favorites.');
  } else {
    res.status(400).send('Nope. Thankfully not real.')
  }
})

app.delete('/users/:id', (req,res) =>{
  const { id } = req.params;

  let user = users.find( user => user.id == id );

  if (user) {
    users = users.filter( user => user.id != id);
    res.status(200).send('${id} is gone? Finally!');
  } else {
    res.status(400).send('Don\'t know who that is but I hate them anyways.')
  }
})


//Create Requets
app.post('/users', (req,res) =>{
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser)
  } else {
    res.status(400).send('Ummm? Name please???? God. Get it together.')
  }
})

app.post('/users/:id/:movieTitle', (req,res) =>{
  const { id,movieTitle } = req.params;

  let user = users.find( user => user.id == id );

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send('User ${id} likes ${movieTitle}? Knew they had no taste.');
  } else {
    res.status(400).send('Fake movie. Doesn\'t exist.')
  }
})


//Udate requests
app.put('/users/:id', (req,res) =>{
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find( user => user.id == id );

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send('Who?')
  }
})

  
 // GET requests
app.get('/', (req, res) => {
    res.send('Welcome to my movie team!');
  });
  
app.get('/documentation', (req, res) => {                  
    res.sendFile('public/documentation.html', { root: __dirname });
  });
  
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
  });

app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find( movie => movie.Title === title);

    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(400).send('Nope. Not here.')
    }
  })
  
app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find( movie => movie.Genre.Name === genreName ).Genre;

    if (genre) {
      res.status(200).json(genre);
    } else {
      res.status(400).send('Hasn\'t been invented yet. You could be the first!')
    }
  })

app.get('/movies/directors/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find( movie => movie.Director.Name === directoreName ).Director;

    if (director) {
      res.status(200).json(director);
    } else {
      res.status(400).send('They are yet to be. Name your kid that, maybe?')
    }
  })  
  
// listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });