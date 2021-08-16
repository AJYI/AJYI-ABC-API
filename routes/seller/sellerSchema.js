const joi = require('@hapi/joi');

module.exports.createSellerSchema = joi.object().keys({
    sellerName: joi.string().required(),
    phoneNumber: joi.string().required(),
    email: joi.string().email().required(),
    storeName: joi.string().required(),
    products: joi.array().items(joi.string()) // https://stackoverflow.com/questions/42656549/joi-validation-of-array
});

module.exports.getAllSellerSchema = joi.object().keys({
    skip: joi.string(),
    limit: joi.string()
});

module.exports.updateSellerSchema = joi.object().keys({
    sellerName: joi.string(),
    phoneNumber: joi.string(),
    email: joi.string().email(),
    storeName: joi.string()
    // No products because that will be a seperate thing
});

module.exports.addToStoreSchema = joi.object().keys({
    products: joi.array().items(joi.string().required()).required()
});

