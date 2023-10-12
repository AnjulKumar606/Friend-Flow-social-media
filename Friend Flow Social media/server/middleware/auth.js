import pkg from 'jsonwebtoken';
const { jwt } = pkg

// Middleware for verifying user authentication token
export const verifyToken = async (req, res, next) => {
    try {
        // Extract the token from the Authorization header
        let token = req.header("Authorization");

        // Check if the token is present
        if (!token) {
            // If no token is provided, respond with a 403 status (Access Denied)
            return res.status(403).send("Access Denied");
        }

        // Check if the token starts with "Bearer "
        if (token.startsWith("Bearer ")) {
            // If it does, remove "Bearer " from the token string
            token = token.slice(7, token.length).trimLeft();
        }

        // Verify the token using the JWT_SECRET
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the verified user information to the request object for future use
        req.user = verified;

        // Continue to the next middleware or route handler
        next();
    } catch (err) {
        // If an error occurs during token verification, respond with a 500 status and an error message
        res.status(500).json({ error: err.message });
    }
};
