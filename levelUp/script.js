// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secretKey', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/gamifiedEdu', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define User Schema
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    points: { type: Number, default: 0 },
    badges: { type: [String], default: [] }
});

const User = mongoose.model('User', UserSchema);

// Authentication setup
passport.use(new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username });
    if (!user) return done(null, false, { message: 'Incorrect username' });
    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? done(null, user) : done(null, false, { message: 'Incorrect password' });
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

// Routes
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.json({ message: 'User registered successfully' });
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}));

app.get('/dashboard', (req, res) => {
    if (!req.isAuthenticated()) return res.redirect('/login');
    res.json({ message: `Welcome ${req.user.username}`, points: req.user.points, badges: req.user.badges });
});

// Example endpoint for earning points
app.post('/earn-points', async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: 'Unauthorized' });
    req.user.points += 10;
    await req.user.save();
    res.json({ message: 'Points earned!', points: req.user.points });
});

// Leaderboard page
app.get('/leaderboard', async (req, res) => {
    const users = await User.find().sort({ points: -1 }).limit(10);
    res.json(users);
});

// Boss Fight Page
app.get('/boss-fight', (req, res) => {
    if (!req.isAuthenticated()) return res.redirect('/login');
    res.json({ message: 'Prepare for the Boss Fight!', bossHealth: 100, userHealth: 100 });
});

// Shop Area
const items = [
    { id: 1, name: 'Power Boost', cost: 50 },
    { id: 2, name: 'Extra Life', cost: 100 }
];

app.get('/shop', (req, res) => {
    res.json(items);
});

app.post('/buy', async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: 'Unauthorized' });
    const { itemId } = req.body;
    const item = items.find(i => i.id === itemId);
    if (!item) return res.status(400).json({ message: 'Item not found' });
    if (req.user.points < item.cost) return res.status(400).json({ message: 'Not enough points' });
    req.user.points -= item.cost;
    await req.user.save();
    res.json({ message: `You bought ${item.name}!`, points: req.user.points });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
