const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const Restaurant = require("../models/Restaurant");

exports.getBookingCheckout = async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const people = parseInt(req.query.people) || 2;
        const coupon = req.query.coupon || "LMD30";

        if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Restaurant ID format"
            });
        }

        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            });
        }

        const pricePerPerson = restaurant.discountedPrice;
        const baseSubtotal = pricePerPerson * people;
        const discountAmount = Math.round(baseSubtotal * 0.5); 
        const subtotalAfterDiscount = baseSubtotal - discountAmount;

        let couponDiscount = 0;
        if (coupon.toUpperCase() === "LMD30") {
            couponDiscount = Math.round(subtotalAfterDiscount * 0.3);
        }

        const taxesAndFees = 91;
        const totalAmount = subtotalAfterDiscount - couponDiscount + taxesAndFees;
        const savings = discountAmount + couponDiscount;

        res.json({
            success: true,
            data: {
                restaurant: {
                    _id: restaurant._id,
                    name: restaurant.name,
                    location: restaurant.location,
                    imageUrl: restaurant.images[0] || "",
                    category: "Buffet"
                },
                bookingSummary: {
                    date: req.query.date || "Today, May 27, 2025",
                    time: req.query.time || "Any Time",
                    people: people,
                    mealType: req.query.mealType || "Lunch"
                },
                pricing: {
                    baseSubtotal,
                    discountAmount,
                    couponDiscount,
                    taxesAndFees,
                    totalAmount,
                    savings
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error: Unable to compute checkout pricing details",
            error: error.message
        });
    }
};

exports.createBooking = async (req, res) => {
    try {
        const {
            restaurantId,
            contactDetails,
            bookingDetails,
            paymentMethod,
            coupon
        } = req.body;

        if (!restaurantId || !contactDetails || !bookingDetails) {
            return res.status(400).json({
                success: false,
                message: "Please provide restaurantId, contactDetails, and bookingDetails"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Restaurant ID format"
            });
        }

        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            });
        }

        const people = bookingDetails.people || 2;
        const pricePerPerson = restaurant.discountedPrice;
        const baseSubtotal = pricePerPerson * people;
        const discountAmount = Math.round(baseSubtotal * 0.5);
        const subtotalAfterDiscount = baseSubtotal - discountAmount;

        let couponDiscount = 0;
        if (coupon && coupon.toUpperCase() === "LMD30") {
            couponDiscount = Math.round(subtotalAfterDiscount * 0.3);
        }

        const taxesAndFees = 91;
        const totalAmount = subtotalAfterDiscount - couponDiscount + taxesAndFees;
        const savings = discountAmount + couponDiscount;

        const booking = new Booking({
            restaurant: restaurantId,
            contactDetails,
            bookingDetails,
            paymentMethod,
            pricing: {
                originalPrice: baseSubtotal,
                discountedPrice: subtotalAfterDiscount,
                offerDiscount: couponDiscount,
                taxesAndFees,
                totalAmount,
                savings
            }
        });

        await booking.save();

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error: Unable to create booking",
            error: error.message
        });
    }
};

exports.getBookingDetails = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Booking ID format"
            });
        }

        const booking = await Booking.findById(id).populate("restaurant");

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        res.json({
            success: true,
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error: Unable to fetch booking details",
            error: error.message
        });
    }
};
