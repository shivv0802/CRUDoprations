const mongoose = require('mongoose');
const connectDb = async () => {
    await mongoose.connect('mongodb://localhost:27017/crudOperation');
    console.log("mongo db connected");
}
module.exports = connectDb