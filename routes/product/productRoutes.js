const express = require('express');
const router = express.Router();
const productController = require('./productController');

//Schema Validation
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const productSchema = require('./productSchema');

/*
###############################
# Defining HTTP Methods below #
###############################
*/

// To create the product information
router.post('/create/', joiSchemaValidation.validateBody(productSchema.createProductSchema), productController.createProduct);

// To fetch all records
router.get('/fetchAll/', joiSchemaValidation.validateQueryParams(productSchema.getAllProductSchema), productController.fetchAllProducts);

// To fetch by id
router.get('/fetch/:id', productController.fetchProduct);

// To update the product
router.put('/updateProduct/:id', joiSchemaValidation.validateBody(productSchema.updateProductSchema), productController.updateProduct)

// Deleting a product
router.delete('/deleteProduct/:id', productController.deleteProduct);

module.exports = router;