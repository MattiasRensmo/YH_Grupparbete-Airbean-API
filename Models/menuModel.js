const db = require("../database")

const getMenu = async () => {
    try {
        const menu = await db.findOne({ })
        console.log(menu)
  
        return menu
        
    } catch (error) {
        console.error("Error retrieving the menu", error)
        throw new Error ("Error retrieving the menu")
    }
}

module.exports = getMenu()