import bcrypt from "bcrypt";
import pkg from 'jsonwebtoken';
const { jwt } = pkg;
import User from "../models/User.js";

//* register User
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;

        // Generate a salt using bcrypt
        const salt = await bcrypt.genSalt();

        // Hash the password using the generated salt
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash, //enrypt the password
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000), //fake data
            impression: Math.floor(Math.random() * 10000)
        });
        // Save the new user to the database
        const savedUser = await newUser.save();

        // Respond with the saved user details
        res.status(201).json(savedUser);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//* Login in 

// Controller function for user login
export const login = async (req, res) => {
    try {
        // Extract email and password from the request body
        const { email, password } = req.body;

        // Find the user in the database by their email
        const user = await User.findOne({ email: email });

        // Check if the user exists
        if (!user) {
            // If the user does not exist, respond with a 400 status and a message
            return res.status(400).json({ msg: 'User not found' });
        }

        // Compare the provided password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);

        // If the passwords do not match, respond with a 400 status and a message
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // If the passwords match, generate a JSON Web Token (JWT) for user authentication
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        // Remove the password from the user object before sending it in the response
        delete user.password;

        // Respond with a 200 status, the generated token, and the user details
        res.status(200).json({ token, user });
    } catch (err) {
        // If an error occurs during the process, respond with a 500 status and an error message
        res.status(500).json({ error: err.message });
    }
};
