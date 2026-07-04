const HeroSection = require("../models/HeroSection");
const Category = require("../models/category");
const Property = require("../models/Property");
const TrustBadge = require("../models/TrustBadge");
const LiveActivity = require("../models/LiveActivity");

exports.getHomeData = async (req, res) => {
    try {
        let hero = await HeroSection.findOne();
        
        if (!hero) {
            hero = {
                headline: "Live Last-Minute Deals in",
                highlightedText: "Pune & Lonavala",
                subtitle: "Hotels • Villas • Camping | Book Today, Stay Today",
                backgroundImageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
                stats: [
                    { label: "Properties", value: "77+", icon: "house" },
                    { label: "Bookings", value: "4,000+", icon: "booking" },
                    { label: "Savings", value: "Up to 70%", icon: "percent" },
                    { label: "Confirmation", value: "Instant", icon: "zap" }
                ]
            };
        }

        const categories = await Category.find();

        const properties = await Property.find({ isLiveDeal: true }).populate("category");

        const trustBadges = await TrustBadge.find();

        const liveActivities = await LiveActivity.find().sort({ createdAt: -1 });

        const headerConfig = {
            logoText: "Last Minutes Deal",
            locations: ["Pune & Lonavala", "Mumbai", "Goa"],
            navLinks: [
                { title: "Home", isActive: true, path: "/" },
                { title: "Stay", isActive: false, path: "/stay" },
                { title: "Buffet", isActive: false, path: "/buffet" }
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
                properties,
                trustBadges,
                liveActivities,
                footer: footerConfig
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error: Unable to fetch home screen data",
            error: error.message
        });
    }
};
