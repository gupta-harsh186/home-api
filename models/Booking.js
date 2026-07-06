const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
    contactDetails: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true }
    },
    bookingDetails: {
        date: { type: String, required: true },
        time: { type: String, required: true },
        people: { type: Number, default: 2 },
        mealType: { type: String, default: "Lunch" }
    },
    paymentMethod: {
        type: String,
        enum: ["Pay at Restaurant", "Cashfree Payments"],
        default: "Pay at Restaurant"
    },
    pricing: {
        originalPrice: { type: Number, required: true },
        discountedPrice: { type: Number, required: true },
        offerDiscount: { type: Number, default: 0 },
        taxesAndFees: { type: Number, default: 0 },
        totalAmount: { type: Number, required: true },
        savings: { type: Number, default: 0 }
    },
    status: {
        type: String,
        enum: ["Pending", "Confirmed", "Cancelled"],
        default: "Pending"
    }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
