const joi = require('@hapi/joi');

module.exports.createProductSchema = joi.object().keys({
    productName: joi.string().required(),
    price: joi.number(),
    quantity: joi.number()
});

module.exports.getAllProductSchema = joi.object().keys({
    skip: joi.string(),
    limit: joi.string()
});

module.exports.updateProductSchema = joi.object().keys({
    productName: joi.string(),
    price: joi.number(),
    quantity: joi.number()
});