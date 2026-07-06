const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    isVerified: {
        type: Boolean,
        default: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    reviewsCount: {
        type: Number,
        default: 0
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    detailedLocation: {
        type: String,
        default: ""
    },
    images: {
        type: [String],
        default: []
    },
    cuisineType: {
        type: String,
        default: "Multi Cuisine"
    },
    mealTypes: {
        type: [String],
        default: ["Lunch", "Dinner"]
    },
    whatsIncluded: {
        type: [String],
        default: []
    },
    timings: {
        lunch: { type: String, default: "12:00 PM - 4:00 PM" },
        dinner: { type: String, default: "7:00 PM - 11:30 PM" }
    },
    idealFor: {
        type: [String],
        default: []
    },
    ambience: {
        type: String,
        default: "Casual Dining"
    },
    importantInfo: {
        type: [String],
        default: []
    },
    howToRedeem: {
        type: [String],
        default: []
    },
    contactNo: {
        type: String,
        default: ""
    },
    termsAndConditions: {
        type: [String],
        default: []
    },
    originalPrice: {
        type: Number,
        required: true
    },
    discountedPrice: {
        type: Number,
        required: true
    },
    discountPercentage: {
        type: Number,
        required: true
    },
    tag: {
        type: String,
        default: "UP TO 50% OFF"
    },
    isLiveDeal: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Restaurant", restaurantSchema);
