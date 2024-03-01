const mongoose = require('mongoose')
require('dotenv').config()

const connect_db = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL).then(db => {
            if (!db) return process.exit(1)
            else {
                console.log("✅ Database connected successfully")
            }
        }).catch(error => {
            console.log(`Connection failed...! ${error}`)
        })
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connect_db