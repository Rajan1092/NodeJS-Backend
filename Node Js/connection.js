const mongoose = require('mongoose');

const db='mongodb://localhost:27017/demorajanap'

mongoose.connect(db).then(()=>{
    console.log('Mongoose Connected');
}).catch((error)=>{
    console.log(error);
})