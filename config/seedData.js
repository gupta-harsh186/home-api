const Category = require("../models/category");
const HeroSection = require("../models/HeroSection");
const TrustBadge = require("../models/TrustBadge");
const LiveActivity = require("../models/LiveActivity");
const Property = require("../models/Property");
const Banner = require("../models/Banner");

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

    } catch (error) {
        console.error(" Error seeding database:", error.message);
    }
};

module.exports = seedDatabase;
