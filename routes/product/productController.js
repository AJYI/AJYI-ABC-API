const productLogic = require('./productLogic');
const constantResponse = require('../constants/productConstants')

/*
This file just send the data to the logic side for easier readability
*/

// Create Product controller
module.exports.createProduct = async (req, res) => {
    let response = {...constantResponse.defaultServerResponse}; //using spread operator
    try{
        const responseFromLogic = await productLogic.createProduct(req.body);
        response.status = 200;
        response.message = constantResponse.productMessage.CREATED;
        response.body = responseFromLogic;
    } catch (error) {
        console.log('Something went wrong within the controller createProduct', error);
        response.message = error.message;
    }

    // Returns the results 
    return res.status(response.status).send(response);
};

// To fetch all of the products
module.exports.fetchAllProducts = async (req, res) => {
    let response = {...constantResponse.defaultServerResponse}; //using spread operator
    try{
        const responseFromLogic = await productLogic.fetchAllProducts(req.query); // Don't forget req.query for the data
        response.status = 200;
        response.message = constantResponse.productMessage.FETCHED;
        response.body = responseFromLogic;
    } catch (error) {
        console.log('Something went wrong within the controller fetchAllProduct', error);
        response.message = error.message;
    }

    // Returns the results 
    return res.status(response.status).send(response);
};

// To fetch one of the products
module.exports.fetchProduct = async (req, res) => {
    let response = {...constantResponse.defaultServerResponse}; //using spread operator
    try{
        const responseFromLogic = await productLogic.fetchProduct(req.params);
        console.log(req.params);
        response.status = 200;
        response.message = constantResponse.productMessage.FETCHED;
        response.body = responseFromLogic;
    } catch (error) {
        console.log('Something went wrong within the controller fetchProduct', error);
        response.message = error.message;
    }

    // Returns the results 
    return res.status(response.status).send(response);
};

// To update one of the products
module.exports.updateProduct = async (req, res) => {
    let response = {...constantResponse.defaultServerResponse}; //using spread operator
    try{
        const responseFromLogic = await productLogic.updateProduct({id: req.params.id, updateData: req.body}); 
        response.status = 200;
        response.message = constantResponse.productMessage.UPDATED;
        response.body = responseFromLogic;
    } catch (error) {
        console.log('Something went wrong within the controller updateProduct', error);
        response.message = error.message;
    }

    // Returns the results 
    return res.status(response.status).send(response);
};

// To delete a product
module.exports.deleteProduct = async (req, res) => {
    let response = {...constantResponse.defaultServerResponse}; //using spread operator
    try{
        const responseFromLogic = await productLogic.deleteProduct({id: req.params.id}); 
        response.status = 200;
        response.message = constantResponse.productMessage.DELETED;
        response.body = responseFromLogic;
    } catch (error) {
        console.log('Something went wrong within the controller updateProduct', error);
        response.message = error.message;
    }

    // Returns the results 
    return res.status(response.status).send(response);
};