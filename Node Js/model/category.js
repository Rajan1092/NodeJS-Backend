const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    icon:{
        type:String,
        required:true
    },
    iconcolor:{
        type:String,
        required:true
    },
    dateCreated:{
        type:Date,
        default:Date.now()
    }
}
)
categorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

categorySchema.set('toJSON', {
    virtuals: true,
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;


// {
//     "name": "Puma",
//     "icon": "Puma.png",
//     "iconcolor": "#ffffff"
// }