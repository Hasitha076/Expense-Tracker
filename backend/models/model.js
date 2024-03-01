const mongoose = require('mongoose')


// category
const categorySchema = new mongoose.Schema({
    type: { type: String, default: "Investment" },
    color: { type: String, default: '#FCBE44' }
})

// Transaction
const transactionSchema = new mongoose.Schema({
    name: {
        type: String, default: "Anonymous"
    },
    type: {
        type: String, default: "Investment"
    },
    amount: {
        type: Number
    },
    date: {
        type: Date, default: Date.now
    }
})

const Categories = mongoose.model('category', categorySchema)
const Transactions = mongoose.model('transaction', transactionSchema)

exports.default = Transactions
module.exports = {
    Categories,
    Transactions
}