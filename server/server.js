var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var compression = require('compression');

var films = require('./film-data.json');
var ratings = require('./rating-data.json');
 
var app = express();
app.use(bodyParser.json());     // parse application/json
app.use(morgan('combined'));    // logs incoming requests
app.use(cors());                // allow all cors
app.use(compression());         // gzips response
 
var router = express.Router();
 
router.get('/films', function(req, res) {
  res.json(films);
});
 
router.get('/films/:id', function(req, res) {
  var filmsFilteredById = films.filter(function(film) { 
    return film.id == req.params.id 
  });
  
  if(filmsFilteredById.length == 0) {
    res.statusCode = 404;
    return res.send('Error 404: No film found');
  }
  
  res.json(filmsFilteredById[0]);
});
 
router.post('/films', function(req, res) {
  if(!req.body.hasOwnProperty('title')) {
    res.statusCode = 400;
    return res.send('Error 400: POST data invalid.');
  }
 
  var newFilm = clone(req.body);
  newFilm.id =  films.length + 1;
  console.log('New id:' + newFilm.id); 
  films.push(newFilm);
  res.json(true);
});
  
router.put('/films/:id', function(req, res) {
  var filmsFilteredById = films.filter(function(film) { 
    return film.id == req.params.id 
  });
  
  if(filmsFilteredById.length == 0) {
    res.statusCode = 404;
    return res.send('Error 404: No film found');
  }

  if(!req.body.hasOwnProperty('title')) {
    res.statusCode = 400;
    return res.send('Error 400: PUT data invalid.');
  }
 
  for (i = 0; i < films.length; i++) {
     if (films[i].id == req.body.id) {     
        console.log('Film found with id:' + req.body.id); 
        
        films[i].title = req.body.title,
        films[i].imageUrl = req.body.imageUrl,
        films[i].releaseDate = req.body.releaseDate,
        films[i].rating = req.body.rating,
        films[i].length = req.body.length
        break; 
     }
   }

  res.json(true);
});

router.delete('/films/:id', function(req, res) {
  for (i = 0; i < films.length; i++) {
    if (films[i].id == req.params.id) {
      console.log('Film found with id:' + req.params.id);
      films.splice(i,1);  
      res.json(true);
    }
  }
 
  res.statusCode = 404;
  return res.send('Error 404: No film found');
});

router.get('/ratings', function(req, res) {
  res.json(ratings);
});
 
app.use('/api', router);

app.use('/', express.static('./client/'));
app.use('/', express.static('./'));

console.log('Client: http://localhost:3412/'); 
console.log('Server: http://localhost:3412/api/films');
app.listen(process.env.PORT || 3412);

function clone(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}