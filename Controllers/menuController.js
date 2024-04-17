const Menu = require("../Models/orderModel")

exports.getMenu = async (req, res) => {
    try {
        const menu = await Menu.getMenu()
        if (!menu) {
            return res.status(404).json({success: false, message: "No menu found"})
        }
        return res.status(200).json({success: true, menu: menu})
    } catch (error) {
        return res.status(500).status({success: false, message: "Failed to retrieve menu"})
    }
}