const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    sellerName: String,
    phoneNumber: String,
    email: String,
    storeName: String,
    products: {type: [String], default: []} // NEED TO MAKE IT SO WHEN A USER ADDS AN ITEM THROUGH PAYLOAD IT CHECKS WHETHER THE ITEM EXISTS
}, {
    timestamps: true,
    toObject: {
        transform: function(doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

module.exports = mongoose.model('Seller', sellerSchema);