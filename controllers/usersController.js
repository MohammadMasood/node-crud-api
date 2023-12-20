const { v4: uuidv4 } = require('uuid');
const users = [];

const getAllUsers = (req, res) => {
    res.status(200).json(users);
}

module.exports = {
    getAllUsers,
}