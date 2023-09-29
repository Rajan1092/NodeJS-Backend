const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    moredescription: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        required: true
    },
    images: {
        type: String,
        default: []
    },
    brand: {
        type: String,
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    rating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
})

productSchema.virtual('id').get(function () {
    return this._id.toHexString();
}
);
productSchema.set("toJSON", { virtuals: true });

const Product = mongoose.model('Product', productSchema)

module.exports = Product


// {
//     "name": "Jorden",
//     "description":"qwert",
//     "image":"abc.png",
//     "brand":"Adidas",
//     "price":4000,
//     "category":"651435877bd76cc8f4a2a8d5",
//     "countInStock":15,
//     "numReviews":3,
//     "rating":10

// }