const express = require('express');
const { engine } = require('express-handlebars');
const session = require('express-session');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const path = require('path');
const methodOverride = require('method-override');
const app = express();
const flash = require('connect-flash');

// Load config
dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT;

connectDB();

// engine hbs
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// req body middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Alerts
app.use(
  session({
    secret: 'your-secret-key', // Puedes cambiar esto a una cadena más segura
    resave: false,
    saveUninitialized: false
  })
);

app.use(flash()); // Agregamos connect-flash después de session

// Custom middleware para hacer las alertas flash disponibles en todas las plantillas
app.use((req, res, next) => {
  res.locals.error = req.flash('error');
  next();
});

// put
app.use(methodOverride('_method'));

// Routes
app.use('/', require('./routes/index'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



