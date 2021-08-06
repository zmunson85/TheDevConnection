const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB is Ready To Store Data For Your Mern APP')

    } catch (err) {
        console.error(err.message);
        //exit the process with a fail msg
        process.exit(1);
    }
}

module.exports = connectDB;