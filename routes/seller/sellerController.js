const sellerLogic = require('./sellerLogic');
const constantResponse = require('../constants/sellerConstants')

/*
This file just send the data to the logic side for easier readability
*/

// Create Product controller
module.exports.createSeller = async (req, res) => {
    let response = {...constantResponse.defaultServerResponse}; //using spread operator
    try{
        const responseFromLogic = await sellerLogic.createSeller(req.body);
        response.status = 200;
        response.message = constantResponse.sellerMessage.CREATED;
        response.body = responseFromLogic;
    } catch (error) {
        console.log('Something went wrong within the controller createSeller', error);
        response.message = error.message;
    }

    // Returns the results 
    return res.status(response.status).send(response);
};

// To fetch all of the sellers controller
module.exports.fetchAllSellers = async (req, res) => {
    let response = {...constantResponse.defaultServerResponse}; //using spread operator
    try{
        const responseFromLogic = await sellerLogic.fetchAllSellers(req.query); // Don't forget req.query for the data
        response.status = 200;
        response.message = constantResponse.sellerMessage.FETCHED;
        response.body = responseFromLogic;
    } catch (error) {
        console.log('Something went wrong within the controller fetchAllSeller', error);
        response.message = error.message;
    }

    // Returns the results 
    return res.status(response.status).send(response);
};

// To fetch one of the sellers controller
module.exports.fetchSeller = async (req, res) => {
    let response = {...constantResponse.defaultServerResponse}; //using spread operator
    try{
        const responseFromLogic = await sellerLogic.fetchSeller(req.params); // Don't forget req.params for the data
        response.status = 200;
        response.message = constantResponse.sellerMessage.FETCHED;
        response.body = responseFromLogic;
    } catch (error) {
        console.log('Something went wrong within the controller fetchAllProduct', error);
        response.message = error.message;
    }

    // Returns the results 
    return res.status(response.status).send(response);
};

// To fetch all of the products from the seller controller
module.exports.fetchStoreProductsByID = async (req, res) => {
    let response = {...constantResponse.defaultServerResponse}; //using spread operator
    try{
        const responseFromLogic = await sellerLogic.fetchStoreProductsByID(req.params); // Don't forget req.params for the data
        response.status = 200;
        response.message = constantResponse.sellerMessage.PRODUCT_FETCHED;
        response.body = responseFromLogic;
    } catch (error) {
        console.log('Something went wrong within the controller fetchAllProduct', error);
        response.message = error.message;
    }

    // Returns the results 
    return res.status(response.status).send(response);
};

// To fetch all of the products from the seller controller
module.exports.fetchAllStoreProducts = async (req, res) => {
    let response = {...constantResponse.defaultServerResponse}; //using spread operator
    try{
        const responseFromLogic = await sellerLogic.fetchAllStoreProducts(); // Don't forget req.params for the data
        response.status = 200;
        response.message = constantResponse.sellerMessage.PRODUCT_FETCHED;
        response.body = responseFromLogic;
    } catch (error) {
        console.log('Something went wrong within the controller fetchAllProduct', error);
        response.message = error.message;
    }

    // Returns the results 
    return res.status(response.status).send(response);
};

// To update one of the sellers controller
module.exports.updateSellerInfo = async (req, res) => {
    let response = {...constantResponse.defaultServerResponse}; //using spread operator
    try{
        const responseFromLogic = await sellerLogic.updateSellerInfo({id: req.params.id, updateData: req.body}); 
        response.status = 200;
        response.message = constantResponse.sellerMessage.SELLER_UPDATED;
        response.body = responseFromLogic;
    } catch (error) {
        console.log('Something went wrong within the controller updateSellerInfo', error);
        response.message = error.message;
    }

    // Returns the results 
    return res.status(response.status).send(response);
};

// Adds product(s) to the store controller
module.exports.addToStore = async (req, res) => {
    let response = {...constantResponse.defaultServerResponse}; //using spread operator
    try{
        const responseFromLogic = await sellerLogic.addToStore({id: req.params.id, updateData: req.body}); 
        response.status = 200;
        response.message = constantResponse.sellerMessage.STORE_UPDATED;
        response.body = responseFromLogic;
    } catch (error) {
        console.log('Something went wrong within the controller addToStore', error);
        response.message = error.message;
    }

    // Returns the results 
    return res.status(response.status).send(response);
};

// Deleting a seller controller
module.exports.deleteSeller = async (req, res) => {
    let response = {...constantResponse.defaultServerResponse}; //using spread operator
    try{
        const responseFromLogic = await sellerLogic.deleteSeller({id: req.params.id}); 
        response.status = 200;
        response.message = constantResponse.sellerMessage.DELETED;
        response.body = responseFromLogic;
    } catch (error) {
        console.log('Something went wrong within the controller deleteSeller', error);
        response.message = error.message;
    }

    // Returns the results 
    return res.status(response.status).send(response);
};

// Deletes product(s) from store controller
module.exports.removeFromStore = async (req, res) => {
    let response = {...constantResponse.defaultServerResponse}; //using spread operator
    try{
        const responseFromLogic = await sellerLogic.removeFromStore({id: req.params.id, deleteData: req.body}); 
        response.status = 200;
        response.message = constantResponse.sellerMessage.DELETED_FROM_STORE;
        response.body = responseFromLogic;
    } catch (error) {
        console.log('Something went wrong within the controller deleteFromStore', error);
        response.message = error.message;
    }

    // Returns the results 
    return res.status(response.status).send(response);
};