const express = require('express');
const dotEnv = require('dotenv');
const cors = require('cors');
const databaseConnection = require('./database/connection');

//For documentation
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

dotEnv.config();

const app = express();

// Connecting to Cloud Mongo
databaseConnection();

// To prevent cors error
app.use(cors());

// request payload middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res, next) => {
    res.send('Welcome to ABC backend API, please refer to the API doccumentation');
});


// Modularized API URLS
app.use('/api/product', require('./routes/product/productRoutes'));
app.use('/api/seller', require('./routes/seller/sellerRoutes'));

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Port that the app will listen on
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server listening on ${PORT}`);
});

// Error handling middleware
app.use(function (err, req, res, next){
    console.error(err.stack)
    res.status(500).send({
        status: 500,
        message: err.message,
        body: {}
    });
})