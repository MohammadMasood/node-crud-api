const users = [];

const getAllUsers = (req, res) => {
    res.status(200).json(users);
}

module.exports = {
    getAllUsers
}