const mongoose = require("mongoose");
const Restaurant = require("../models/Restaurant");
const Category = require("../models/category");
const LiveActivity = require("../models/LiveActivity");
const TrustBadge = require("../models/TrustBadge");

exports.getBuffetHome = async (req, res) => {
    try {
        const hero = {
            headline: "Live Last-Minute Buffet Deals in",
            highlightedText: "Pune & Lonavala",
            subtitle: "Top Restaurants • Premium Buffets — Book New, Dine Today",
            backgroundImageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
            stats: [
                { label: "Restaurants", value: "45+", icon: "restaurant" },
                { label: "Buffets Booked", value: "2,500+", icon: "booking" },
                { label: "Savings", value: "Flat 50% Off", icon: "percent" },
                { label: "Confirmation", value: "Instant", icon: "zap" }
            ]
        };

        const categories = await Category.find();

        const restaurants = await Restaurant.find({ isLiveDeal: true });

        const trustBadges = await TrustBadge.find();

        const liveActivities = await LiveActivity.find({
            $or: [
                { type: "buffet" },
                { message: { $regex: /buffet/i } },
                { message: { $regex: /sold/i } }
            ]
        }).sort({ createdAt: -1 });

        const headerConfig = {
            logoText: "Last Minutes Deal",
            locations: ["Pune & Lonavala", "Mumbai", "Goa"],
            navLinks: [
                { title: "Home", isActive: false, path: "/" },
                { title: "Stay", isActive: false, path: "/stay" },
                { title: "Buffet", isActive: true, path: "/buffet" }
            ]
        };

        const footerConfig = {
            contactNumber: "+91 98765 43210",
            supportHours: "Mon - Sun, 9 AM - 9 PM",
            aboutText: "Premium curated journeys for the spontaneous traveler. Discover hidden gems and luxury deals in real-time.",
            quickLinks: [
                { name: "About Us", path: "/about" },
                { name: "How It Works", path: "/how-it-works" },
                { name: "Help Center", path: "/help" },
                { name: "Careers", path: "/careers" },
                { name: "Terms of Service", path: "/terms" },
                { name: "Privacy Policy", path: "/privacy" }
            ],
            supportLinks: [
                { name: "Booking Guide", path: "/booking-guide" },
                { name: "Cancellation Policy", path: "/cancellation" },
                { name: "Payment Options", path: "/payments" },
                { name: "Contact Us", path: "/contact" },
                { name: "FAQ", path: "/faq" }
            ]
        };

        res.json({
            success: true,
            data: {
                header: headerConfig,
                hero,
                categories,
                properties: restaurants,
                trustBadges,
                liveActivities,
                footer: footerConfig
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error: Unable to fetch buffet home screen data",
            error: error.message
        });
    }
};

exports.getBuffetDetails = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Buffet ID format"
            });
        }

        const restaurant = await Restaurant.findById(id);

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant/Buffet not found"
            });
        }

        const similarRestaurants = await Restaurant.find({
            _id: { $ne: id },
            location: restaurant.location
        }).limit(6);

        res.json({
            success: true,
            data: {
                buffet: restaurant,
                similarStays: similarRestaurants
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error: Unable to fetch buffet details",
            error: error.message
        });
    }
};
