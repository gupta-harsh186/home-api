const mongoose = require("mongoose");

const trustBadgeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    iconUrl: {
        type: String,
        default: ""
    }
}, { timestamps: true });

module.exports = mongoose.model("TrustBadge", trustBadgeSchema);
