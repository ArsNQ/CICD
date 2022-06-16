const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const http = require("http");
const mongoose = require("mongoose");
const connectMongo = require('connect-mongo');
const session = require("express-session");
const passport = require('passport');
const {v4} = require('uuid');
const PORT = 8081;
const app = express();
const server = http.Server(app);
const MongoStore = connectMongo(session);

const authController = require('./controllers/AuthController');
const meetingSlotsController = require('./controllers/MeetingSlotsController');
const usersController = require('./controllers/UsersController');
const feedbackController = require('./controllers/FeedbackController');

require('./config/auth');

dotenv.config();
const {DB_HOST, DB_USER, DB_PASSWORD, DB_BDD} = process.env;

mongoose.set('useCreateIndex', true);

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_BDD}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to DB");
}).catch(err => {
    console.error("Connection error", err);
    process.exit();
});

app.use(express.json());
app.use(cors({credentials: true, origin: true, exposedHeaders: ['x-auth-token']}));
app.use(session({
    genid: (req) => v4(),
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    secret: 'dashboard salt',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authController);
app.use('/meetingSlots', meetingSlotsController);
app.use('/feedback', feedbackController);
app.use('/user', usersController);

app.get("/", (req, res) => {
    res.json({message: "API Working"});
});

server.listen(PORT, function () {
    console.log(`Server running on port: ${PORT}`);
});
