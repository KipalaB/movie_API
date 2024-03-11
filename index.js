const express = require('express');
const morgan = require('morgan');
const app = express();

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
let topMovies = [
    {
      title: 'Harry Potter and the Sorcerer\'s Stone',
      author: 'J.K. Rowling'
    },
    {
      title: 'Lord of the Rings',
      author: 'J.R.R. Tolkien'
    },
    {
      title: 'Twilight',
      author: 'Stephanie Meyer'
    },
    {
        title: 'Mama\'s House',
        author: 'Tyler Perry?'
    },
    {
        title: 'A movie, probably',
        author: 'Lothric and his dumb brother'
    },
    {
        title: 'Dude, where\'s my tank?',
        author: 'Rooster Teeth'
    },
    {
        title: 'Jiji\'s weird journey',
        author: 'Jiji, duh'
    },
    {
        title: 'Careerfoundry',
        author: 'A very nice german probably'
    },
    {
        title: 'Anime',
        author: 'Emperor Naruhito'
    },
    {
        title: 'this code',
        author: 'Me, you fool!'
    }
  ];
  
  // GET requests
  app.get('/', (req, res) => {
    res.send('Welcome to my movie team!');
  });
  
  app.get('/documentation', (req, res) => {                  
    res.sendFile('public/documentation.html', { root: __dirname });
  });
  
  app.get('/movies', (req, res) => {
    res.json(topMovies);
  });
  
  
  // listen for requests
  app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });