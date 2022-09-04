const mongoose = require('mongoose');
const config = require('../configs/app');


module.exports = function() {
     mongoose.connect(config.mongodbUri)
    .then(() => 
            console.log("Connected to MongoDB")
    )

} 