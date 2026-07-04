const HeroSection = require("../models/HeroSection");
const Category = require("../models/category");
const Property = require("../models/Property");
const TrustBadge = require("../models/TrustBadge");
const LiveActivity = require("../models/LiveActivity");

// Fetch unified homepage data according to Figma Screen 3
exports.getHomeData = async (req, res) => {
    try {
        // 1. Fetch Hero Section Configuration
        let hero = await HeroSection.findOne();
        
        // If not found, provide a fallback matching Figma
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

        // 2. Fetch Categories (Stay, Buffet, etc.)
        const categories = await Category.find();

        // 3. Fetch Live Deals (Properties)
        // Default Lonavala & Pune deals first or all live deals
        const properties = await Property.find({ isLiveDeal: true }).populate("category");

        // 4. Fetch Trust Badges
        const trustBadges = await TrustBadge.find();

        // 5. Fetch Live Activity Feed
        const liveActivities = await LiveActivity.find().sort({ createdAt: -1 });

        // 6. Additional static/configuration data for the page (Navbar & Footer details)
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
