const Order = require('../models/orders.js')
const createOrder = async(req,res)=>{
    const {cart } = req.body;
    const newOrder = new Order({
        user:req.user._id,
        cart,
        date:Date.now()
    })
}
module.exports = {createOrder}