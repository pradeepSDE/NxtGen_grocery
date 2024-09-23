const User = require('../models/user');
const updateAddress = async (req, res) => { 
    const { address } = req.body;
    console.log(address);
    const { id } = req.params;
    console.log(id);
    const user = await User.findById(id);
    console.log(user);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    user.address = address;
    await user.save();
    res.json({ message: 'Address updated successfully' });
};
module.exports = { updateAddress };