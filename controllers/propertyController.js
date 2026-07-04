const Property = require("../models/Property");

// Fetch all properties
exports.getAllProperties = async (req, res) => {
    try {
        const { category, featured } = req.query;
        let query = {};

        if (category) {
            query.category = category;
        }
        if (featured) {
            query.isFeatured = featured === "true";
        }

        const properties = await Property.find(query).populate("category");
        res.json({
            success: true,
            count: properties.length,
            data: properties
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error: Unable to fetch properties",
            error: error.message
        });
    }
};

// Create a new property
exports.createProperty = async (req, res) => {
    try {
        const { 
            title, 
            description, 
            location, 
            imageUrl, 
            rating, 
            reviewsCount, 
            amenities, 
            originalPrice, 
            discountedPrice, 
            discountPercentage, 
            tag, 
            category, 
            isFeatured,
            isLiveDeal 
        } = req.body;

        if (!title || !location || !imageUrl || !originalPrice || !discountedPrice || !discountPercentage || !category) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields (title, location, imageUrl, originalPrice, discountedPrice, discountPercentage, category)"
            });
        }

        const newProperty = new Property({
            title,
            description,
            location,
            imageUrl,
            rating,
            reviewsCount,
            amenities,
            originalPrice,
            discountedPrice,
            discountPercentage,
            tag,
            category,
            isFeatured,
            isLiveDeal
        });

        await newProperty.save();

        res.status(201).json({
            success: true,
            message: "Property created successfully",
            data: newProperty
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error: Unable to create property",
            error: error.message
        });
    }
};
