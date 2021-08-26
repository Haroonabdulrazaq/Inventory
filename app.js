/* eslint-disable no-undef */
import createError from 'http-errors';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import compression from 'compression';
import helmet from 'helmet';

import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import path from "path";
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import catalogRouter from './routes/catalog.js';

var app = express();

// Compression -- Compress all routes
app.use(compression())

// Helmet -- Protect app from well know web vulnerability
app.use(helmet())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

// Database Connection
var dev_db_url = process.env.MONGODB_URL;
var mongoDB = dev_db_url; // process.env.MONGODB_URI ||
mongoose
  .connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=> console.log("Database Connected"))
  .catch((err)=> console.log("Database Error", err))

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
