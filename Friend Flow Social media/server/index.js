import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import postsRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/post.js";
import { users, posts } from "./data/index.js";

//* configurations

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config(); // Load environment variables from a .env file into process.env

// Setting up an Express application
const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

// Helmet middleware for security headers
app.use(helmet());

// Configuring Cross-Origin Opener Policy with Helmet middleware
app.use(helmet.crossOriginOpenerPolicy({ policy: "same-origin" }));
// The above line sets the Cross-Origin Opener Policy to 'same-origin',
// which restricts the ability to embed the page to the same origin.

// Morgan middleware for HTTP request logging
app.use(morgan("common"));
// The above line uses the "common" predefined format for logging,
// which includes information like remote address, user identifier, HTTP method, etc.

// Use bodyParser middleware to parse incoming JSON data
// - limit: "30mb" sets the maximum size of the JSON payload to 30 megabytes
// - extended: true allows for parsing of nested objects in the JSON payload
app.use(bodyParser.json({ limit: "30mb", extended: true }));

// - extended: true allows for parsing of URL-encoded data with the 'qs' library
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

//* file storage
const storage = multer.diskStorage({
    // Configuration for storing uploaded files on disk
    destination: function (req, file, cb) {
        // Callback function to determine the destination directory
        cb(null, "public/assets");
    },
    // Configuration for naming the uploaded files
    filename: function (req, file, cb) {
        // Callback function to determine the filename
        // Concatenate the current timestamp with the original filename
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// Initializing Multer with the configured storage options
const upload = multer({ storage });

//* Routes with files

// Route for user registration with file upload
app.post("/auth/register", upload.single("picture"), register);

// Route for creating a post with file upload and token verification
app.post("/posts", verifyToken, upload.single("picture"), createPost);


//*Routes  
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);


//* MONGOOSE SETUP
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL || {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

        /* ADD DATA ONE TIME */
        // User.insertMany(users);
        // Post.insertMany(posts);
    })
    .catch((error) => console.log(`${error} did not connect`));

