const User = require('../models/user');
const updateAddress = async (req, res) => { 

    try {
        
        const { address } = req.body;
        console.log(address);
        const { id } = req.params;
        console.log(id,"id FROM ADR",req.params);
        const user = await User.findById(id);
        console.log(user, "from address");
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.address = address;
        await user.save();
        res.json({ message: 'Address updated successfully' });
    } catch (error) {
        console.log(error);
        
    }
};
module.exports = { updateAddress };