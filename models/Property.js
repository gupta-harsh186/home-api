const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    reviewsCount: {
        type: Number,
        default: 0
    },
    amenities: {
        type: [String],
        default: ["Wi-Fi", "Pool", "2 Guests"]
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
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    isLiveDeal: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Property", propertySchema);
