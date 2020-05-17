const express = require('express');
const morgan = require('morgan');
const mongo  = require('mongoose');
const bodyParser = require('body-parser');


// importing api routes
const personRoute = require('./api/route/person-route');
const userRoute  = require('./api/route/user-route');
const serviceRoute = require('./api/route/service-route');
const countryRoute = require('./api/route/country-route');
const cityRoute = require('./api/route/commun-route');
const areaRoute = require('./api/route/area-route');
const taskRoute = require('./api/route/task-route');
const equipmentRoute = require('./api/route/equipment-route');
const paymentMethodRoute = require('./api/route/payment-method-route');
const reviewRoute = require('./api/route/review-route');
const provideRoute = require('./api/route/provide-route');
const programRoute = require('./api/route/program-route');
const paymentRoute = require('./api/route/payment-route');
const categoryRoute = require('./api/route/category-route');
const subCategoryRoute = require('./api/route/subCategory-route');


const app = express();

/*
mongo.connect('mongodb://localhost/eservice',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
});
*/
mongo.connect('mongodb+srv://eservice:admin@cluster0-jotbb.mongodb.net/eservice?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});


app.disable('etag');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    //res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
    //res.header('Access-Control-Allow-Origin', 'http://localhost:8082')
    //res.header('Access-Control-Allow-Origin', 'http://localhost:8083')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
    next();
});


// Defining urls for endpoints(resources) to be access by any request
app.use("/koolo/v-1/users",userRoute);
app.use("/koolo/v-1/persons",personRoute);
app.use("/koolo/v-1/services",serviceRoute);
app.use("/koolo/v-1/countries",countryRoute);
app.use("/koolo/v-1/communs",cityRoute);
app.use("/koolo/v-1/areas",areaRoute);
app.use("/koolo/v-1/tasks",taskRoute);
app.use('/koolo/v-1/reviews',reviewRoute);
app.use("/koolo/v-1/provides",provideRoute);
app.use("/koolo/v-1/paymentMethods",paymentMethodRoute);
app.use("/koolo/v-1/equipments",equipmentRoute);
app.use("/koolo/v-1/programs",programRoute);
app.use("/koolo/v-1/payments",paymentRoute);
app.use("/koolo/v-1/categories",categoryRoute);
app.use("/koolo/v-1/subcategories",subCategoryRoute);


// Error to be returned in case any happens
app.use((req,res,next)=>{
    const error = new Error("Not found");
    error.stack=404;
    next(error);
});

// Error to be returned in case anything happens
app.use((req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    });
});

module.exports = app;