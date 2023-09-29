const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const SECRET_KEY = "RAJANVANIKARNIKITARATHODISHAVANI"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password cannot be less than 8 characters'],
        maxlength: [16, 'Password cannot be more than 16 characters']
    },
    confirmpassword: {
        type: String,
        required: true,
    },
    street:{
        type: String,
        required: [true, 'Street is required']
    },
    appartment:{
        type: String,
        required: [true, 'Apartment is required']
    },
    city:{
        type: String,
        required: [true, 'City is required']
    },
    zip:{
        type: Number,
        required: [true, 'Zip is required']
    },
    country:{
        type: String,
        required: [true, 'Country is required']
    },
    phone:{
        type: Number,
        required: [true, 'Phone is required']
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ],
    dateCreated: {
        type: Date,
        default: Date.now()
    }
})

userSchema.virtual('id').get(function () {
    return this._id.toHexString()
}
)
userSchema.set('toJSON',{ virtuals : true })

userSchema.methods.genrateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id},SECRET_KEY) 
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        return token;
    }
    catch(err){
        console.log(err);
    }
}

const User = mongoose.model('User',userSchema)

module.exports = User

// {
//     "name" : "Rajan Vanikar",
//     "email": "rajanvanikar@gmail.com",
//     "password": "Rajan@2003",
//     "confirmpassword": "Rajan@2003",
//     "appartment": "7 Parimal ",
//     "street" : "Chandkheda",
//     "city": "Ahmedabad",
//     "country" : "India",
//     "zip": 382424,
//     "phone": 9104810902
// }