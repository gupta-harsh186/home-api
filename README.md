# Home API - Last Minutes Deal

This is the backend API repository for **Screen 3 (Home Screen)** of the "Last Minutes Deal" project.

## Features
- **Unified Home Screen Endpoint**: Returns all dynamic layout configurations, categories, live deals (properties), trust badges, and live activity ticker notifications.
- **Auto-Seeding**: Automatic population of initial sample data matching the Figma layout in MongoDB on first startup.
- **Property Management**: Basic CRUD support for adding and listing properties.

## Tech Stack
- **Node.js** & **Express**
- **MongoDB** & **Mongoose**
- **Nodemon** (for development)

## Setup & Running

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables (create `.env` file):
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/home_api
   ```

3. Run the development server (auto-seeds database on first connect):
   ```bash
   npm run dev
   ```

4. Verify endpoint:
   - GET `http://localhost:5000/api/home`
