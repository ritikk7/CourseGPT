const User = require("../models/user");

async function updateUser(req, res) {
    // TODO
    const userId = req.params.userId;
    const updates = req.body;
    //const updatedUser = await User.findByIdAndUpdate(userId, updates);
    res.send({data: `Hello put usr ${userId} ${updates}`});
}

async function deleteUser(req, res) {
    // TODO
    const userId = req.params.userId;
    //const deletedUser = await User.findByIdAndDelete(userId);
    res.send({data: `Hello delete usr ${userId}`});
}

module.exports = {
    updateUser,
    deleteUser,
};
