var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const {decodeToken} = require('./app/middlewares')
const productRoute = require('./app/product/routes');
const categoryRoute = require('./app/category/router');
const cartRoute = require('./app/cart/routes');
const tagRoute = require('./app/tag/routes');
const authRoute = require('./app/auth/routes');
const orderRoute = require('./app/order/routes');
const invoiceRoute = require('./app/invoice/routes');
const deliveryAddressRoute = require('./app/deliveryAddres/routes')
const orderItemRoute = require('./app/order-item/router');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(  express.static(path.join(__dirname, 'public/images/products/')));
app.use(decodeToken());


app.use('/auth' , authRoute);
app.use('/api' , orderItemRoute);
app.use('/api' , productRoute);
app.use('/api' , categoryRoute);
app.use('/api' , tagRoute);
app.use('/api' , deliveryAddressRoute);
app.use('/api' , cartRoute);
app.use('/api', orderRoute);
app.use('/api', invoiceRoute);
//home 
app.use('/' , function(req, res)  {
  res.render('index' , {
    title: 'Eduwork API Service'
  });
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
