const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: String,
    price: {type: Number, default: 0},
    quantity: {type: Number, default: 0}
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

module.exports = mongoose.model('Product', productSchema);