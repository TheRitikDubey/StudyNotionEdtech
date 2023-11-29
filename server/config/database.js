const mongoose = require('mongoose');
require('dotenv');


exports.connect= ()=> {
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=> {
        console.log("Your Study Notion DB Connected Sucessfully :)");
    }).catch((err)=> {
        console.log("DB connection error");
        console.log("ERROR Message: ", err);
        process.exit(1);
    })

}
