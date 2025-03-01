# Khaad Web Backend

This is the backend server for the Khaad Web application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a .env file in the root directory and add your environment variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/khaad-web
# For MongoDB Atlas, use:
# MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/khaad-web
```

3. Start the development server:
```bash
npm run dev
```

## Available Scripts

- `npm start`: Run the server in production mode
- `npm run dev`: Run the server in development mode with hot-reload

## Database

The application uses MongoDB as its database. Make sure you have MongoDB installed locally or have a MongoDB Atlas connection string ready.
