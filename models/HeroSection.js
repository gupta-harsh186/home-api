const mongoose = require("mongoose");

const statSchema = new mongoose.Schema({
    label: { type: String, required: true },
    value: { type: String, required: true },
    icon: { type: String, default: "" }
});

const heroSectionSchema = new mongoose.Schema({
    headline: {
        type: String,
        required: true
    },
    highlightedText: {
        type: String,
        default: ""
    },
    subtitle: {
        type: String,
        required: true
    },
    backgroundImageUrl: {
        type: String,
        required: true
    },
    stats: [statSchema]
}, { timestamps: true });

module.exports = mongoose.model("HeroSection", heroSectionSchema);
