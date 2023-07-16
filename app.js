const express = require('express');
const {engine} = require('express-handlebars');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const path = require('path');
const methodOverride = require('method-override')
const app = express();

app.use(express.json());

// Load config
dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT;

connectDB();

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
});

// engine hbs
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// put 
app.use(methodOverride('_method'));

// req body middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Routes 
app.use('/', require('./routes/index'));
