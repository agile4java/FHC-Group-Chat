const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require('http');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const socketio = require('socket.io');
const { Users } = require('./helpers/UsersClass');

const container = require('./container');

require('dotenv').config();

container.resolve(function (users, _, home, admin, group) {
  //Eddies
  // mongoose.Promise = global.Promise;
  // mongoose.connect('mongodb://localhost/footballkik', {
  //   useMongoClient: true
  // });
  //mine
  const dbURI = `${process.env.MONGODB_URLPRE_OLD}${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}${process.env.MONGODB_URLEND_OLD}`;
  //const dbURI = process.env.MONGO_DBURI;
  const options = {
    reconnectTries: Number.MAX_VALUE,
    poolSize: 10,
    useNewUrlParser: true
  }

  mongoose.connect(dbURI, options).then(
    () => {
      console.log("Database Connection Established!");
    },
    err => {
      console.log("Error connecting to database: ", err);
    }
  );

  const app = SetupExpress();

  function SetupExpress() {
    const app = express();
    const server = http.createServer(app);
    // variable for socket.io 
    const io = socketio(server);
    server.listen(3000, function () {
      console.log('listening on port 3000');
    });
    // Call configureExpress function below
    ConfigureExpress(app);
    // Require socketio logic
    require('./socket/groupchat')(io, Users);
    // from install express-promise-router
    const router = require('express-promise-router')();
    // passing router to controllers
    users.SetRouting(router);
    home.SetRouting(router);
    admin.SetRouting(router);
    group.SetRouting(router);
    // use router 
    app.use(router);
  }

  // configure Express
  function ConfigureExpress(app) {
    require('./passport/passport-local');
    require('./passport/passport-facebook');
    require('./passport/passport-google');

    app.use(express.static('public'));
    app.use(cookieParser());
    app.set('view engine', 'ejs');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: true
    }));

    app.use(validator());
    // session middleware
    app.use(
      session({
        secret: 'thisisasecretkey',
        resave: true,
        saveInitialized: true,
        saveUninitialized: true,
        //Eddies
        store: new MongoStore({
          mongooseConnection: mongoose.connection
        })
      }));
    // passport must be added after session
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
    // Register lodash as a global variable
    app.locals._ = _;
  }
})