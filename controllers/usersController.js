const { v4: uuidv4, validate: uuidValidate  } = require('uuid');
const users = [];

const isValidUUID = (id) => {
    return uuidValidate(id);
};

const findUserById = (userId) => {
    return users.find(user => user.id === userId);
};

const getAllUsers = (req, res) => {

    try {
        res.status(200).json(users);
    }
    catch(error){
        return res.status(500).json({ error: error});
    }
    
}

const getUserById = (req, res) => {
    
    try {
        const userId = req.params.userId;

        if (!isValidUUID(userId)) {
        return res.status(400).json({ error: 'Invalid userId format' });
        }

        const user = findUserById(userId);

        if (!user) {
        return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    }
    catch(error){
        console.log("error", error);
        return res.status(500).json({ error: error});
    }
}

const createUser = (req, res) => {
    
    try {
        const { username, age, hobbies } = req.body;

        if (!username || !age) {
        return res.status(400).json({ error: 'Username and age are required fields' });
        }

        const newUser = {
        id: uuidv4(),
        username,
        age,
        hobbies: hobbies || []
        };

        users.push(newUser);

        res.status(201).json(newUser);
    }
    catch(error){
        console.log("error", error);
        return res.status(500).json({ error: error});
    }
  }


  const updateUser =  (req, res) => {

    try {
        const userId = req.params.userId;

        if (!isValidUUID(userId)) {
        return res.status(400).json({ error: 'Invalid userId format' });
        }

        const userIndex = users.findIndex(user => user.id === userId);

        if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
        }

        const { username, age, hobbies } = req.body;

        users[userIndex] = {
        ...users[userIndex],
        username: username || users[userIndex].username,
        age: age || users[userIndex].age,
        hobbies: hobbies || users[userIndex].hobbies
        };

        res.status(200).json(users[userIndex]);
    }
    catch(error){
        return res.status(500).json({ error: error});
    }
  }

  const deleteUser = (req, res) => {

    try {
        const userId = req.params.userId;

        if (!isValidUUID(userId)) {
        return res.status(400).json({ error: 'Invalid userId format' });
        }

        const userIndex = users.findIndex(user => user.id === userId);

        if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
        }

        users.splice(userIndex, 1);

        res.status(204).send();
    }
    catch(error){
        return res.status(500).json({ error: error});
    }
  }

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}