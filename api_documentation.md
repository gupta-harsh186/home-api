# Last Minutes Deal - Home Screen API Documentation

This API supports **Screen 3 (Home Screen)** of the "Last Minutes Deal" Figma design. It provides a unified endpoint that returns all the dynamic components needed to render the Home Screen in a single call.

## Table of Contents
1. [Base Configuration](#base-configuration)
2. [Unified Home Screen Endpoint](#unified-home-screen-endpoint)
3. [Property Management Endpoints](#property-management-endpoints)
4. [Database Schemas](#database-schemas)
5. [Automated Seeding](#automated-seeding)

---

## Base Configuration

- **Development Server URL:** `http://localhost:5000`
- **Headers:** `Content-Type: application/json`

---

## Unified Home Screen Endpoint

### 1. Get Home Screen Data
Returns all required components for Screen 3 (Navbar config, Hero configuration, Stats, Categories, Live Deals, Trust Badges, Live Activities, and Footer config).

- **Endpoint:** `/api/home`
- **Method:** `GET`
- **Response Format:**
```json
{
  "success": true,
  "data": {
    "header": {
      "logoText": "Last Minutes Deal",
      "locations": [
        "Pune & Lonavala",
        "Mumbai",
        "Goa"
      ],
      "navLinks": [
        { "title": "Home", "isActive": true, "path": "/" },
        { "title": "Stay", "isActive": false, "path": "/stay" },
        { "title": "Buffet", "isActive": false, "path": "/buffet" }
      ]
    },
    "hero": {
      "_id": "64b73a2...",
      "headline": "Live Last-Minute Deals in",
      "highlightedText": "Pune & Lonavala",
      "subtitle": "Hotels • Villas • Camping | Book Today, Stay Today",
      "backgroundImageUrl": "https://images.unsplash.com/photo-1540555700478-4be289fbecef...",
      "stats": [
        { "label": "Properties", "value": "77+", "icon": "house" },
        { "label": "Bookings", "value": "4,000+", "icon": "booking" },
        { "label": "Savings", "value": "Up to 70%", "icon": "percent" },
        { "label": "Confirmation", "value": "Instant", "icon": "zap" }
      ]
    },
    "categories": [
      {
        "_id": "64b73a2...",
        "name": "Stay",
        "icon": "hotel",
        "slug": "stay"
      },
      {
        "_id": "64b73a2...",
        "name": "Buffet",
        "icon": "restaurant",
        "slug": "buffet"
      }
    ],
    "properties": [
      {
        "_id": "64b73a2...",
        "title": "Sunroof Hotel",
        "description": "A luxury experience with premium amenities and excellent service.",
        "location": "Hinjawadi, Pune",
        "imageUrl": "https://images.unsplash.com/photo-1566073771259-6a8506099945...",
        "rating": 4.4,
        "reviewsCount": 120,
        "amenities": ["Wi-Fi", "Pool", "2 Guests"],
        "originalPrice": 4500,
        "discountedPrice": 2199,
        "discountPercentage": 51,
        "tag": "UP TO 50% OFF",
        "category": {
          "_id": "64b73a2...",
          "name": "Stay",
          "slug": "stay"
        },
        "isFeatured": false,
        "isLiveDeal": true
      }
      // ... 18 properties matching the Figma grid layout
    ],
    "trustBadges": [
      {
        "title": "Verified Properties",
        "description": "Handpicked stays you can trust",
        "iconUrl": "shield-check"
      },
      {
        "title": "Instant Confirmation",
        "description": "Book in seconds & get confirmed",
        "iconUrl": "zap"
      },
      {
        "title": "24/7 Customer Support",
        "description": "We're here anytime you need us",
        "iconUrl": "phone-call"
      },
      {
        "title": "Best Last-Minute Deals",
        "description": "Save up to 70% on stays today!",
        "iconUrl": "tag"
      }
    ],
    "liveActivities": [
      { "message": "Someone booked a villa in Lonavala", "timeAgo": "3 mins ago", "type": "booking" },
      { "message": "Couple booked a room in Pune", "timeAgo": "5 mins ago", "type": "booking" },
      { "message": "Family booked a stay in Lonavala", "timeAgo": "8 mins ago", "type": "booking" },
      { "message": "Rooms sold today", "timeAgo": "12 Rooms", "type": "rooms_sold" }
    ],
    "footer": {
      "contactNumber": "+91 98765 43210",
      "supportHours": "Mon - Sun, 9 AM - 9 PM",
      "aboutText": "Premium curated journeys for the spontaneous traveler. Discover hidden gems and luxury deals in real-time.",
      "quickLinks": [
        { "name": "About Us", "path": "/about" },
        { "name": "How It Works", "path": "/how-it-works" },
        { "name": "Help Center", "path": "/help" }
        // ...
      ],
      "supportLinks": [
        { "name": "Booking Guide", "path": "/booking-guide" },
        { "name": "Cancellation Policy", "path": "/cancellation" }
        // ...
      ]
    }
  }
}
```

---

## Property Management Endpoints

### 1. Get All Properties (Filtered)
Retrieve properties with optional query filters.

- **Endpoint:** `/api/properties`
- **Method:** `GET`
- **Query Parameters:**
  - `category` (String - Category ObjectId)
  - `featured` (Boolean - `true`/`false`)
- **Response Format:**
```json
{
  "success": true,
  "count": 18,
  "data": [ ... ]
}
```

### 2. Create Property
Add a new property to the database.

- **Endpoint:** `/api/properties`
- **Method:** `POST`
- **Request Body:**
```json
{
  "title": "Sunroof Hotel",
  "description": "A luxury experience with premium amenities.",
  "location": "Hinjawadi, Pune",
  "imageUrl": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
  "rating": 4.4,
  "reviewsCount": 120,
  "amenities": ["Wi-Fi", "Pool", "2 Guests"],
  "originalPrice": 4500,
  "discountedPrice": 2199,
  "discountPercentage": 51,
  "tag": "UP TO 50% OFF",
  "category": "64b73a216434...", 
  "isFeatured": false,
  "isLiveDeal": true
}
```

---

## Database Schemas

### 1. Property Schema (`models/Property.js`)
```javascript
{
    title: { type: String, required: true },
    description: { type: String },
    location: { type: String, required: true },
    imageUrl: { type: String, required: true },
    rating: { type: Number, default: 4.5 },
    reviewsCount: { type: Number, default: 0 },
    amenities: { type: [String], default: ["Wi-Fi", "Pool", "2 Guests"] },
    originalPrice: { type: Number, required: true },
    discountedPrice: { type: Number, required: true },
    discountPercentage: { type: Number, required: true },
    tag: { type: String, default: "UP TO 50% OFF" },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    isFeatured: { type: Boolean, default: false },
    isLiveDeal: { type: Boolean, default: true }
}
```

### 2. Category Schema (`models/category.js`)
```javascript
{
    name: { type: String, required: true, unique: true },
    icon: { type: String, default: "" },
    slug: { type: String, required: true, unique: true }
}
```

### 3. Hero Section Schema (`models/HeroSection.js`)
```javascript
{
    headline: { type: String, required: true },
    highlightedText: { type: String, default: "" },
    subtitle: { type: String, required: true },
    backgroundImageUrl: { type: String, required: true },
    stats: [
        { label: { type: String }, value: { type: String }, icon: { type: String } }
    ]
}
```

### 4. Trust Badge Schema (`models/TrustBadge.js`)
```javascript
{
    title: { type: String, required: true },
    description: { type: String, required: true },
    iconUrl: { type: String }
}
```

### 5. Live Activity Schema (`models/LiveActivity.js`)
```javascript
{
    message: { type: String, required: true },
    timeAgo: { type: String, required: true },
    type: { type: String, default: "booking" }
}
```

---

## Automated Seeding
To make it completely seamless, the server automatically detects if the database is empty and seeds all the configurations, categories, trust badges, and **18 property cards** exactly matching the Figma design upon first run.
