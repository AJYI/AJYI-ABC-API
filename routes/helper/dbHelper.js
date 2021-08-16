const mongoose = require('mongoose');
const productConstants = require('../constants/productConstants');

//This function iterats through the array and gets the toObject invoked on those indices
module.exports.formatMongoData = (data) =>{
    if(Array.isArray(data)){
        let formattedData = [];
        for(value of data){
            formattedData.push(value.toObject());
        }
        return formattedData;
    }
    return data.toObject();
}

// Checks whether each of the indices within the data exists in the product table
// IF EXIST: then that item will be pushed into seller product
// IF NOT EXIST: then that item will be ignored
// Source: https://www.geeksforgeeks.org/how-to-check-if-a-string-is-valid-mongodb-objectid-in-nodejs/
module.exports.verifyProducts = (data) =>{
    let arr = [];
    let uniqArray = [...new Set(data)]; // to prevent duplicates

    ObjectId = mongoose.Types.ObjectId;
    for(value of uniqArray){
        if(ObjectId.isValid(value)){
            arr.push(value);
        }
        continue;
    }
    return arr;
}

// This function checks whether the object exists within the database
module.exports.checkObjectId = (id) =>{
    objectId = mongoose.Types.ObjectId;
    if(!objectId.isValid(id)){
        throw new Error(productConstants.databaseMessage.INVALID_ID);
    }
}