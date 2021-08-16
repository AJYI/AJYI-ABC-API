const Product = require('../../database/models/ProductModel')
const Helper = require('../helper/dbHelper')
const constantResponse = require('../constants/productConstants')

/*
This file handles the logic and database insertion
*/

// Create Product logic
module.exports.createProduct = async (serviceData) => {
    try{
        let product = new Product({
            productName: serviceData.productName,
            price: serviceData.price,
            quantity: serviceData.quantity
        });
        let result = await product.save();
        return Helper.formatMongoData(result);
    } catch (error) {
        console.log('Error within createProduct', error);
        throw new Error(error);
    }
}

// Fetch All Product Logic
module.exports.fetchAllProducts = async ({skip, limit}) => {
    try{
        let products = await Product.find({}).skip(parseInt(skip)).limit(parseInt(limit)); // The params are always string
        return Helper.formatMongoData(products);
    } catch (error) {
        console.log('Error within fetchAllProducts', error);
        throw new Error(error);
    }

}

// Fetching one product logic
module.exports.fetchProduct = async ({id}) => {
    try{
        // Checks all of the ID
        Helper.checkObjectId(id);
        // Checks whether the id is a product id
        let product = await Product.findById(id);
        if(product == null){
            throw new Error(constantResponse.productMessage.NOT_FOUND);
        }
        return Helper.formatMongoData(product);
    } catch (error) {
        console.log('Error within fetchProduct', error);
        throw new Error(error);
    }
}

// Update one product logic
module.exports.updateProduct = async ({id, updateData}) => {
    try{
        Helper.checkObjectId(id);
        let product = await Product.findOneAndUpdate(
            { _id: id },
            updateData,
            { new: true, useFindAndModify: false }
        )
        if(product == null){
            throw new Error(constantResponse.productMessage.NOT_FOUND);
        }
        return Helper.formatMongoData(product);
    } catch (error) {
        console.log('Error within updateProduct', error);
        throw new Error(error);
    }
}

// To delete a product from the database
module.exports.deleteProduct = async ({id}) => {
    try{
        Helper.checkObjectId(id);
        let product = await Product.findByIdAndDelete(id);
        if(product == null){
            throw new Error(constantResponse.productMessage.NOT_FOUND);
        }

        return Helper.formatMongoData(product);
    } catch (error) {
        console.log('Error within deleteProduct', error);
        throw new Error(error);
    }
}