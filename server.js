const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// Use environment variable if it exists
const PORT = process.env.PORT || 3000;
let app = express();

// Set view engine
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// Middleware
// Logger middleware
app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log');
    }
  });

  next();
});
// Maintenance middleware
// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     maintenanceMessage: 'We are currently down for maintenance.  Please check back again soon.'
//   });
// });
// Serve up a directory, public in this case for static html files
app.use(express.static(__dirname + '/public'));

// Hanblebar Helpers
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
}); 

// Routes
app.get('/', (req, res) => {
  //res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Hello Handlebars!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Aww snap!  Unable to fulfill request'
  });
});

// Bind to port
app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`)
});