const Category = require("../models/category");
const HeroSection = require("../models/HeroSection");
const TrustBadge = require("../models/TrustBadge");
const LiveActivity = require("../models/LiveActivity");
const Property = require("../models/Property");
const Banner = require("../models/Banner");
const Restaurant = require("../models/Restaurant");

const seedDatabase = async () => {
    try {
        const categoryCount = await Category.countDocuments();
        let stayCategory, buffetCategory;

        if (categoryCount === 0) {
            console.log("Seeding Categories...");
            stayCategory = await Category.create({
                name: "Stay",
                icon: "hotel",
                slug: "stay"
            });
            buffetCategory = await Category.create({
                name: "Buffet",
                icon: "restaurant",
                slug: "buffet"
            });
            console.log(" Categories Seeded!");
        } else {
            stayCategory = await Category.findOne({ slug: "stay" });
            buffetCategory = await Category.findOne({ slug: "buffet" });
        }

        const heroCount = await HeroSection.countDocuments();
        if (heroCount === 0) {
            console.log(" Seeding Hero Section...");
            await HeroSection.create({
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
            });
            console.log(" Hero Section Seeded!");
        }

        const bannerCount = await Banner.countDocuments();
        if (bannerCount === 0) {
            console.log("Seeding Banners...");
            await Banner.insertMany([
                {
                    title: "Last Minute Stay Deals - Up to 70% Off",
                    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
                    link: "/stay",
                    isActive: true
                },
                {
                    title: "Weekend Buffet Feast - Flat 50% Off",
                    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
                    link: "/buffet",
                    isActive: true
                }
            ]);
            console.log(" Banners Seeded!");
        }

        const badgeCount = await TrustBadge.countDocuments();
        if (badgeCount === 0) {
            console.log(" Seeding Trust Badges...");
            await TrustBadge.insertMany([
                {
                    title: "Verified Properties",
                    description: "Handpicked stays you can trust",
                    iconUrl: "shield-check"
                },
                {
                    title: "Instant Confirmation",
                    description: "Book in seconds & get confirmed",
                    iconUrl: "zap"
                },
                {
                    title: "24/7 Customer Support",
                    description: "We're here anytime you need us",
                    iconUrl: "phone-call"
                },
                {
                    title: "Best Last-Minute Deals",
                    description: "Save up to 70% on stays today!",
                    iconUrl: "tag"
                }
            ]);
            console.log(" Trust Badges Seeded!");
        }

        const activityCount = await LiveActivity.countDocuments();
        if (activityCount === 0) {
            console.log(" Seeding Live Activities...");
            await LiveActivity.insertMany([
                {
                    message: "Someone booked a villa in Lonavala",
                    timeAgo: "3 mins ago",
                    type: "booking"
                },
                {
                    message: "Couple booked a room in Pune",
                    timeAgo: "5 mins ago",
                    type: "booking"
                },
                {
                    message: "Family booked a stay in Lonavala",
                    timeAgo: "8 mins ago",
                    type: "booking"
                },
                {
                    message: "Couple booked a buffet at Sense - Westin",
                    timeAgo: "5 mins ago",
                    type: "buffet"
                },
                {
                    message: "Family booked a table at Barbeque Nation",
                    timeAgo: "10 mins ago",
                    type: "buffet"
                },
                {
                    message: "Rooms sold today",
                    timeAgo: "12 Rooms",
                    type: "rooms_sold"
                }
            ]);
            console.log(" Live Activities Seeded!");
        }

        const propertyCount = await Property.countDocuments();
        if (propertyCount === 0 && stayCategory) {
            console.log(" Seeding Properties...");

            const propertiesToSeed = [];
            for (let i = 1; i <= 18; i++) {
                propertiesToSeed.push({
                    title: "Sunroof Hotel",
                    description: "A luxury experience with premium amenities and excellent service.",
                    location: "Hinjawadi, Pune",
                    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
                    rating: 4.4,
                    reviewsCount: 120,
                    amenities: ["Wi-Fi", "Pool", "2 Guests"],
                    originalPrice: 4500,
                    discountedPrice: 2199,
                    discountPercentage: 51,
                    tag: "UP TO 50% OFF",
                    category: stayCategory._id,
                    isFeatured: i % 3 === 0,
                    isLiveDeal: true
                });
            }

            await Property.insertMany(propertiesToSeed);
            console.log("Properties Seeded!");
        }

        const restaurantCount = await Restaurant.countDocuments();
        if (restaurantCount === 0) {
            console.log(" Seeding Restaurants/Buffets...");
            const restaurantsToSeed = [];
            const names = [
                "Barbeque Nation",
                "Absolute Barbecues",
                "The Corinthians Resort",
                "Sense - Westin",
                "The Square - Novotel",
                "Spice Factory"
            ];
            const locations = [
                "Hinjawadi, Pune",
                "Baner, Pune, Maharashtra",
                "Hadapsar, Pune",
                "Koregaon Park, Pune",
                "Viman Nagar, Pune",
                "Hinjawadi, Pune"
            ];
            const originalPrices = [1299, 1299, 1599, 2199, 1799, 1199];
            const discountedPrices = [649, 649, 799, 1099, 899, 599];
            const discountPercentages = [50, 50, 50, 50, 50, 50];

            for (let i = 1; i <= 18; i++) {
                const idx = (i - 1) % 6;
                const isAB = names[idx] === "Absolute Barbecues";

                restaurantsToSeed.push({
                    name: names[idx],
                    isVerified: true,
                    rating: isAB ? 4.5 : 4.4,
                    reviewsCount: isAB ? 1342 : 120,
                    location: locations[idx],
                    detailedLocation: isAB ? "Absolute Barbecues, 2nd Floor, Westend Mall, Baner, Pune, Maharashtra 411045" : `${names[idx]}, ${locations[idx]}`,
                    images: [
                        "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
                        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
                        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
                        "https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?auto=format&fit=crop&w=600&q=80",
                        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80"
                    ],
                    cuisineType: "Multi Cuisine",
                    mealTypes: ["Lunch", "Dinner"],
                    whatsIncluded: [
                        "Unlimited Starters (Veg & Non-Veg)",
                        "Unlimited Main Course (100+ Dishes)",
                        "Live Grill Counter (BBQ at your table)",
                        "Wide Desserts Spread (Cakes, Indian sweets & more)",
                        "Beverages (Soft drinks & more)",
                        "Salad Bar (Fresh & healthy)"
                    ],
                    timings: {
                        lunch: "12:00 PM - 4:00 PM (Mon - Sun)",
                        dinner: "7:00 PM - 11:30 PM (Mon - Sun)"
                    },
                    idealFor: ["Family", "Friends", "Celebrations", "Corporate Outings"],
                    ambience: "Casual Dining",
                    importantInfo: [
                        "Seating is subject to availability.",
                        "No pre-payment required. Pay at restaurant.",
                        "Not valid on public holidays and special occasions.",
                        "Management reserves the right to change the menu without prior notice."
                    ],
                    howToRedeem: [
                        "Show your booking confirmation at the restaurant and enjoy your buffet."
                    ],
                    contactNo: "+91 98765 43210",
                    termsAndConditions: [
                        "Non-transferable and cannot be clubbed with any other offer.",
                        "Cancellation is allowed before the dining time.",
                        "Applicable taxes as per government norms."
                    ],
                    originalPrice: originalPrices[idx],
                    discountedPrice: discountedPrices[idx],
                    discountPercentage: discountPercentages[idx],
                    tag: "UP TO 50% OFF",
                    isLiveDeal: true
                });
            }

            await Restaurant.insertMany(restaurantsToSeed);
            console.log(" Restaurants Seeded!");
        }

    } catch (error) {
        console.error(" Error seeding database:", error.message);
    }
};

module.exports = seedDatabase;
