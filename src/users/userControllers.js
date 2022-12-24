const User = require(`./userModel`);
exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).send({username: newUser.username});
    } catch (error) {
        console.log(error);
        res.status(500).send({error: error.message});
    }
};
exports.readUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send({users: users.map((user) => {return user.username})})
    } 
    catch (error) {
        console.log(error);
        res.status(500).send({error: error.message});
    }
};
exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.updateOne({username: req.body.username}, req.body);
        res.status(200).send({updated: updatedUser.username, "Updated Entry": req.body});
    } 
    catch (error) {
        console.log(error);
        res.status(500).send({error: error.message});
    }
};
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.deleteOne(req.body);
        res.status(200).send({deleted: deletedUser})
    } catch (error) {
        console.log(error);
        res.status(500).send({error: error.message});
        
    }
};
exports.loginUser = async (req, res) => {
    console.log("middleware passed and controller  has been called")
    try {
        const user = await User.findOne({username: req.body.username});
        console.log(user);
        console.log("username found in our database");
        res.status(200).send({username: user.username, message: "login successful"})
    } catch (error) {
        console.log(error);
        console.log("username not found")
        res.status(500).send({error: error.message})
    }
}