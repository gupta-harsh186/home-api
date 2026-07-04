const mongoose = require("mongoose");

const liveActivitySchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
        trim: true
    },
    timeAgo: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String, // e.g. "booking", "rooms_sold"
        default: "booking"
    }
}, { timestamps: true });

module.exports = mongoose.model("LiveActivity", liveActivitySchema);
