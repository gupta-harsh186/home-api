# Last Minutes Deal - Home & Buffet API Backend

This is the backend API service for the **Last Minutes Deal** platform, powering the **Home Screen (Screen 3)**, **Buffet Home Screen**, **Buffet Details**, and the **Complete Booking** checkout/reservation flows.

## Features

- **Unified Home Screen Endpoint**: Returns navbar header configuration, hero section layout, category navigation, active live stays (properties), trust badges, live booking activities, and footer configuration in a single call (`/api/home`).
- **Buffet Modules**: Provides buffet home feeds (`/api/buffets`) and detailed restaurant layouts (`/api/buffets/:id`) including timings, cuisines, menu details, and similar restaurants.
- **Dynamic Booking & Checkout**: Handles checkout summary calculations (`/api/bookings/checkout/:restaurantId`) including automatic 50% buffet discounts, promo code verification (`LMD30` for flat 30% off), taxes/fees computing, and bookings creation (`/api/bookings`).
- **Automated Seeding**: Auto-populates MongoDB on first startup with initial category data, trust badges, 18 stays/properties, and 18 buffet/restaurant cards matching the Figma design grid.
- **Robust Schema Design**: Clean validation using Mongoose models with proper ObjectId references between collections.

## Tech Stack
- **Node.js** & **Express**
- **MongoDB** & **Mongoose**
- **Cors** (Cross-Origin Resource Sharing)
- **Nodemon** (for hot-reloading development)

---

## Folder Structure
```
├── config/
│   ├── db.js             # Database connection setup
│   └── seedData.js       # Auto-seeding logic for initial mockup data
├── controllers/
│   ├── bookingController.js
│   ├── buffetController.js
│   ├── homeController.js
│   └── propertyController.js
├── models/
│   ├── Banner.js
│   ├── Booking.js
│   ├── category.js
│   ├── HeroSection.js
│   ├── LiveActivity.js
│   ├── Property.js
│   ├── Restaurant.js
│   └── TrustBadge.js
├── routes/
│   ├── bookingRoutes.js
│   ├── buffetRoutes.js
│   ├── homeRoutes.js
│   └── propertyRoutes.js
├── .env                  # Environment Variables (Port & Mongo URI)
├── .gitignore
├── app.js                # Express app initialization
├── server.js             # Server startup entry point
└── package.json
```

---

## Setup & Running

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/home_api
```

### 3. Run Development Server
```bash
npm run dev
```
*(The server will connect to MongoDB, automatically seed mock data if the database is empty, and listen on port 5000)*

---

## API Endpoints Reference

### 1. Home Screen Data
- **Endpoint**: `GET /api/home`
- **Purpose**: Get all unified data needed to render the Home landing page.

### 2. Property / Stays APIs
- **Endpoint**: `GET /api/properties`
  - **Query Filters**: `category` (slug or ObjectId), `featured` (`true`/`false`)
- **Endpoint**: `POST /api/properties`
  - **Purpose**: Create a new property stay (required parameters: `title`, `location`, `imageUrl`, `originalPrice`, `discountedPrice`, `discountPercentage`, `category`).

### 3. Buffet / Restaurant APIs
- **Endpoint**: `GET /api/buffets`
  - **Purpose**: Get unified buffet landing page components (Hero, categories, 18 restaurant cards, activity feeds, badges, footer).
- **Endpoint**: `GET /api/buffets/:id`
  - **Purpose**: Fetch detailed menu items, images, timings, cuisines, and similar stays for a specific restaurant.

### 4. Booking & Reservation APIs
- **Endpoint**: `GET /api/bookings/checkout/:restaurantId`
  - **Query Params**: `people` (default: 2), `coupon` (default: `LMD30`), `date`, `time`, `mealType`
  - **Purpose**: Return real-time subtotal, 50% base discount, coupon discount, taxes/fees, and total amount.
- **Endpoint**: `POST /api/bookings`
  - **Request Body**: `restaurantId`, `contactDetails` (`name`, `phone`, `email`), `bookingDetails` (`date`, `time`, `people`, `mealType`), `paymentMethod`, `coupon`
  - **Purpose**: Create a new reservation record in the database.
- **Endpoint**: `GET /api/bookings/:id`
  - **Purpose**: Fetch specific details of an existing booking.

---

## License
ISC
