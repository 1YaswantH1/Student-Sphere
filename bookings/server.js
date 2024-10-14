const express = require('express');
const connectDB = require('./init/db');
const itemsRoute = require('./routes/items');
const bookingsRoute = require('./routes/bookings');
const path = require('path');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/items', itemsRoute);
app.use('/api/bookings', bookingsRoute);

// Index route
app.get('/', async (req, res) => {
    res.redirect('/api/bookings');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
