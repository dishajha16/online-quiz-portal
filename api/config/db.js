//const mongoose = require('mongoose');
//const dotenv = require('dotenv');
//
//dotenv.config();
//
//const uri = process.env.MONGO_URI;
//
//const connectToMongoDB = async () => {
//    try {
//        await mongoose.connect(uri, {
//            useNewUrlParser: true,
//            useUnifiedTopology: true,
//        });
//        console.log('Connected to MongoDB!');
//    } catch (error) {
//        console.error('Error connecting to MongoDB:', error);
//        process.exit(1);
//    }
//}
//
//module.exports = connectToMongoDB;



//const mongoose = require("mongoose");
//const dotenv = require("dotenv");
//
//dotenv.config();
//
//const uri = process.env.MONGO_URI;
//
//const connectToMongoDB = async () => {
//    if (!uri) {
//        console.log("Skipping MongoDB connection (MONGO_URI not set)");
//        return;
//    }
//
//    try {
//        await mongoose.connect(uri, {
//            useNewUrlParser: true,
//            useUnifiedTopology: true,
//        });
//        console.log("Connected to MongoDB!");
//    } catch (error) {
//        console.error("Error connecting to MongoDB:", error);
//    }
//};
//
//module.exports = connectToMongoDB;


const mongoose = require("mongoose");
require("dotenv").config();

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected!");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

module.exports = connectToMongoDB;
