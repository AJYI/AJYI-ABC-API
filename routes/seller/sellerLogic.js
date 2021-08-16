const Seller = require('../../database/models/SellerModel')
const Helper = require('../helper/dbHelper')
const constantResponse = require('../constants/sellerConstants');
const { array } = require('@hapi/joi');
/*
This file handles the logic and helpers
*/

// Create Seller logic
module.exports.createSeller = async (serviceData) => {
    try {
        let seller = new Seller({
            sellerName: serviceData.sellerName,
            phoneNumber: serviceData.phoneNumber,
            email: serviceData.email,
            storeName: serviceData.storeName,
            // What I want here is to check whether each product is an item that's already registered with ABC.com
            products: [...new Set(Helper.verifyProducts(serviceData.products))]
        });
        let result = await seller.save();
        return result.toObject();
    } catch (error) {
        console.log('Error within createProduct', error);
        throw new Error(error);
    }
}

// Fetch All Seller Logic
module.exports.fetchAllSellers = async ({ skip, limit }) => {
    try {
        let sellers = await Seller.find({}).skip(parseInt(skip)).limit(parseInt(limit)); // The params are always string
        return Helper.formatMongoData(sellers);
    } catch (error) {
        console.log('Error within createProduct', error);
        throw new Error(error);
    }
}

// Fetching one product logic
module.exports.fetchSeller = async ({ id }) => {
    try {
        // Checks all of the ID
        Helper.checkObjectId(id);
        // Checks whether the id is a product id
        let ourSeller = await Seller.findById(id);
        if (ourSeller == null) {
            throw new Error(constantResponse.sellerMessage.NOT_FOUND);
        }
        return Helper.formatMongoData(ourSeller);
    } catch (error) {
        console.log('Error within createProduct', error);
        throw new Error(error);
    }
}

// Fetching one product logic
module.exports.fetchStoreProductsByID = async ({ id }) => {
    try {
        // Checks all of the ID
        Helper.checkObjectId(id);
        // We just want to get the product attribute from the db
        let ourSeller = await Seller.find({ '_id': id }).select('storeName products');
        if (ourSeller == null) {
            throw new Error(constantResponse.sellertMessage.NOT_FOUND);
        }
        return Helper.formatMongoData(ourSeller);
    } catch (error) {
        console.log('Error within createProduct', error);
        throw new Error(error);
    }
}

// Fetching one product logic
module.exports.fetchAllStoreProducts = async () => {
    try {
        // We just want to get the product attribute from the db
        let ourSeller = await Seller.find({}).select('storeName products');
        if (ourSeller == null) {
            throw new Error(constantResponse.sellertMessage.NOT_FOUND);
        }
        return Helper.formatMongoData(ourSeller);
    } catch (error) {
        console.log('Error within createProduct', error);
        throw new Error(error);
    }
}

// Update one of the sellers logic
module.exports.updateSellerInfo = async ({ id, updateData }) => {
    try {
        Helper.checkObjectId(id);
        let ourSeller = await Seller.findOneAndUpdate(
            { _id: id },
            updateData,
            { new: true }
        )
        if (ourSeller == null) {
            throw new Error(constantResponse.sellerMessage.NOT_FOUND);
        }
        return Helper.formatMongoData(ourSeller);
    } catch (error) {
        console.log('Error within updateSellerInfo', error);
        throw new Error(error);
    }
}

// Adding product(s) to the store
module.exports.addToStore = async ({ id, updateData }) => {
    try {
        Helper.checkObjectId(id);

        // This function gets the products array
        let ourSeller = await Seller.find({ '_id': id }).select('products');
        ourSeller = ourSeller[0].toObject();
        if (ourSeller == null) {
            throw new Error(constantResponse.sellerMessage.NOT_FOUND);
        }
        // Just to extract the products array from ourseller
        let productsArr = [];
        for (let key in ourSeller) {
            if (key === 'products') {
                productsArr = [...ourSeller[key]];
                break;
            }
        }
        //We want to make sure that items that already exists in ABC.com will be added properly
        let updateDataArr = Helper.verifyProducts(updateData['products']);
        //Concatting both of the arrays
        let concatArr = productsArr.concat(updateDataArr);
        concatArr = [...new Set(concatArr)];
        //Now we update the seller's product Array
        let ourUpdatedSeller = await Seller.findOneAndUpdate(
            { _id: id },
            { products: concatArr },
            { new: true, useFindAndModify: false }
        )
        return Helper.formatMongoData(ourUpdatedSeller);
    } catch (error) {
        console.log('Error within updateSellerInfo', error);
        throw new Error(error);
    }
}

// To delete a seller from the database
module.exports.deleteSeller = async ({ id }) => {
    try {
        Helper.checkObjectId(id);
        let ourSeller = await Seller.findByIdAndDelete(id);
        if (ourSeller == null) {
            throw new Error(constantResponse.sellerMessage.NOT_FOUND);
        }
        return Helper.formatMongoData(ourSeller);
    } catch (error) {
        console.log('Error within updateSellerInfo', error);
        throw new Error(error);
    }
}

// Deletes product(s) from store
module.exports.removeFromStore = async ({ id, deleteData }) => {
    try {
        Helper.checkObjectId(id);

        // This function gets the products array
        let ourSeller = await Seller.find({ '_id': id }).select('products');
        ourSeller = ourSeller[0].toObject();
        if (ourSeller == null) {
            throw new Error(constantResponse.sellerMessage.NOT_FOUND);
        }
        // Just to extract the products array from ourseller
        let productsArr = [];
        for (let key in ourSeller) {
            if (key === 'products') {
                productsArr = [...ourSeller[key]];
                break;
            }
        }
        //We want to make sure that items that already exists in ABC.com will be added properly
        let deleteDataArr = Helper.verifyProducts(deleteData['products']);

        // Now we just remove 
        for (value of deleteDataArr) {
            const index = productsArr.indexOf(value);

            if (index !== -1) {
                productsArr.splice(index, 1);
            }
        }

        //Now we update the seller's product Array
        let ourUpdatedSeller = await Seller.findOneAndUpdate(
            { _id: id },
            { products: productsArr },
            { new: true, useFindAndModify: false }
        )
        return Helper.formatMongoData(ourUpdatedSeller);
    } catch (error) {
        console.log('Error within deleteFromStore', error);
        throw new Error(error);
    }
}