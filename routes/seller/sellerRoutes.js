const express = require('express');
const router = express.Router();
const sellerController = require('./sellerController');

//Schema Validation
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const sellerSchema = require('./sellerSchema');

/*
###############################
# Defining HTTP Methods below #
###############################
*/

// To create the product information
router.post('/create/', joiSchemaValidation.validateBody(sellerSchema.createSellerSchema), sellerController.createSeller);

// To fetch all records(With products)
router.get('/fetchAll/', joiSchemaValidation.validateQueryParams(sellerSchema.getAllSellerSchema), sellerController.fetchAllSellers);

// To fetch by id
router.get('/fetch/:id', sellerController.fetchSeller);

// To fetch product array from a specific seller(Uses id)
router.get('/fetchStoreProducts/:id', sellerController.fetchStoreProductsByID);

// To fetch all the store id with products
router.get('/fetchAllStoreProducts/', sellerController.fetchAllStoreProducts);

// To update the SELLER'S INFORMATION only(Excludes the store!!!)
router.put('/updateSellerInfo/:id', joiSchemaValidation.validateBody(sellerSchema.updateSellerSchema), sellerController.updateSellerInfo);

// Adds product(s) to the store
router.put('/addToStore/:id', joiSchemaValidation.validateBody(sellerSchema.addToStoreSchema), sellerController.addToStore);

// Deleting a seller from the database
router.delete('/deleteSeller/:id', sellerController.deleteSeller);

// Deleting product(s) from the store
router.put('/removeFromStore/:id', joiSchemaValidation.validateBody(sellerSchema.addToStoreSchema), sellerController.removeFromStore);


module.exports = router;