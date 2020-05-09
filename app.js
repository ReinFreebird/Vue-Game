/**
 * @file Application stack
 * @copyright Phire Studio, 2019
 * @version 1.0.0
 * @module App
 */

/** Dependencies */
const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const morgan = require('morgan');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');

/** Routes Files */
const rock = require('./routes/rock');
const test= require('./routes/test');
const user= require('./routes/users');
const auth= require('./routes/auth');

const dashboard = require('./routes/dashboard');

/** Handlers */
const apiErrorHandlers = require('./handlers/apiErrorHandlers');
const cli = require('./utils/cli');

/** Create Express app object */
const app = express();


/** Serve public folder as static file */
app.use(express.static(path.join(__dirname, 'public')));

/** Body Parser */
app.use(express.json());

/** Cookie Parser */
app.use(cookieParser());

/** Dev logging middleware */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

/** Uploading file */
app.use(fileupload());

/** Sanitizing */
app.use(mongoSanitize());

/** Securing headers */
app.use(helmet());

/** Securing XSS exploit */
app.use(xss());

/** HTTP request limiter */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs (1 windowMS = 60000 ms)
});

// apply to all requests
app.use(limiter);

/** Securing HTTP param pollution exploit */
app.use(hpp());

/** Enabling CORS */
app.use(cors()); // Disable if not needed

/** Mounted Routing */
app.use('/api/v1/rock', rock);
app.use('/api/v1/test', test);
app.use('/api/v1/auth',	auth);
app.use('/api/v1/user',	user);

/** Route for dashboard */
app.use('/dashboard', dashboard);
app.get('/', function(req, res) {
  res.redirect('/dashboard');
});
app.use('/$/', (req, res) => res.redirect('/dashboard'));

/** API error handling */
app.use(apiErrorHandlers);

/** Start the CLI (start last) */
// setTimeout(() => {
//   cli.init();
// }, 50);

/** If all pass, export this stack to server runner */
module.exports = app;
