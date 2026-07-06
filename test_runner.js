const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Restaurant = require("./models/Restaurant");
const Category = require("./models/category");
const Property = require("./models/Property");

dotenv.config();

const run = async () => {
    try {
        console.log("Connecting to:", process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully!");

        const categories = await Category.find();
        console.log("Categories found:", categories.length);

        const restaurants = await Restaurant.find().limit(3);
        console.log("Restaurants found:", restaurants.length);
        if (restaurants.length > 0) {
            console.log("Sample Restaurant ID:", restaurants[0]._id.toString());
        }

        const properties = await Property.find().limit(3);
        console.log("Properties found:", properties.length);

        await mongoose.disconnect();
        console.log("Disconnected from database.");
    } catch (err) {
        console.error("Error occurred in test runner:", err);
        process.exit(1);
    }
};

run();
