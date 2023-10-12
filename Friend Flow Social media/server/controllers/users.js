import User from "../models/User.js";

//*read
// Get user by ID
export const getUser = async (req, res) => {
    try {
        // Extract user ID from the request parameters
        const { id } = req.params;

        // Find the user in the database by their ID
        const user = await User.findById(id);

        // Respond with the user's information if found
        res.status(200).json(user);
    } catch (err) {
        // If an error occurs during the process, respond with a 404 status and an error message
        res.status(404).json({ message: err.message });
    }
}


// Get friends of a user by ID
export const getUserFriends = async (req, res) => {
    try {
        // Extract user ID from the request parameters
        const { id } = req.params;

        // Find the user in the database by their ID
        const user = await User.findById(id);

        // Fetch information of friends using Promise.all and map
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        // Format friend data before sending the response
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );

        // Respond with the formatted friends' information
        res.status(200).json(formattedFriends);
    } catch (err) {
        // If an error occurs during the process, respond with a 404 status and an error message
        res.status(404).json({ message: err.message });
    }
};


//*Update

// Add or Remove Friend for a user by ID
export const addRemoveFriend = async (req, res) => {
    try {
        // Extract user ID and friend ID from the request parameters
        const { id, friendId } = req.params;

        // Find the user and friend in the database by their IDs
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        // Check if the friend is already in the user's friends list
        if (user.friends.includes(friendId)) {
            // If yes, remove the friend from both user and friend's friends list
            user.friends = user.friends.filter((id) => id !== friend.id);
            friend.friends = friend.friends.filter((id) => id !== id);
        } else {
            // If not, add the friend to both user and friend's friends list
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        // Save the updated user and friend information
        await user.save();
        await friend.save();

        // Fetch information of friends again after the update
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        // Format friend data before sending the response
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );

        // Respond with the formatted friends' information
        res.status(200).json(formattedFriends);
    } catch (err) {
        // If an error occurs during the process, respond with a 404 status and an error message
        res.status(404).json({ message: err.message });
    }
}
