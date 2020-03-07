const express = require('express');
const morgan = require('morgan');
const path  = require('path');
const hbs   = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const passport = require('passport');
//initialization
const app = express();
require('./config/passport.js')

//setting
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'))
app.engine('.hbs',hbs({
    defaultLayout:'main',
    layoutsDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname:'.hbs'
}))

app.set('view engine', '.hbs');

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret: 'top secret',
    resave: false,
    saveUninitialized: false,
}))
app.use(flash());
app.use(passport.initialize())
app.use(passport.session())

app.use(methodOverride('_method'));
//global 
app.use((req,res,next)=>{
    app.locals.message = req.flash('info')
    app.locals.error= req.flash('error')
    app.locals.login_error= req.flash('login_error')
    app.locals.user = req.user || null;
      next();
})


//router
app.use('/notes',require('./router/note.js'));
app.use('/users',require('./router/user.js'));
app.use(require('./router/index.js'));



//static
app.use(express.static(path.join(__dirname,'public')))

module.exports= app;