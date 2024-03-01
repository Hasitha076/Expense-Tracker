const { response } = require('express')
const model = require('../models/model')

const createCategorie = (req, res) => {
    try {
        const CreateCategories = new model.Categories({
            type: "Inventment",
            color: "#FCBE44"
        })

        CreateCategories.save().then((result) => {
            res.status(201).json({ message: "Categories successfully created!", data: result })
        }).catch(err => {
            console.log("Failed creation")
        })
    } catch (error) {
        return res.status(500).json({ message: "Server error!" })
    }
}

const getAllCategories = async (req, res) => {
    try {
        const data = await model.Categories.find({})
        if (data != undefined) {
            const filterData = data.map(V => Object.assign({}, { type: V.type, color: V.color }))
            return res.status(200).json({ message: "Get all the categories", data: filterData })
        } else {
            return res.status(404).json({ message: "there are no more categories here" })
        }
    } catch (error) {
        return res.status(500).json({ message: "Server error!" })
    }
}

const createTransaction = async (req, res) => {
    try {
        if (!req.body) return res.status(400).json({ message: "Post HTTP Data not provided!" })

        const { name, type, amount } = req.body

        const CreateTransaction = await new model.Transactions({
            name,
            type,
            amount,
            date: new Date()
        })

        CreateTransaction.save().then((result) => {
            res.status(201).json({ message: "Transaction successfully created!", data: result })
        }).catch(err => {
            console.log("Failed creation")
        })


    } catch (error) {
        return res.status(500).json({ message: "Server error!" })
    }
}

const getAllTransactions = async (req, res) => {
    try {
        const data = await model.Transactions.find({})
        if (data != undefined) {
            const filterData = data.map(V => Object.assign({}, { name: V.name, type: V.type, amount: V.amount, date: V.date }))
            return res.status(200).json({ message: "Get all the transactions", data: filterData })
        } else {
            return res.status(404).json({ message: "there are no more transactions here" })
        }
    } catch (error) {
        return res.status(500).json({ message: "Server error!" })
    }
}

const deleteTransaction = async (req, res) => {
    try {
        model.Transactions.findByIdAndDelete({ _id: req.body.id }).then((result) => {
            if (result != undefined) {
                return res.status(200).json({ message: "Deleted transaction successfully" })
            } else {
                return res.status(404).json({ message: "Not found" })
            }
        })
    } catch (error) {
        return res.status(500).json({ message: "Server error!" })
    }
}

const get_labels = async (req, res) => {
    try {
        await model.Transactions.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "type",
                    foreignField: "type",
                    as: "categories_info"
                }
            },
            {
                $unwind: "$categories_info"
            }
        ]).then((result) => {
            const filter = result.map(v => Object.assign({}, { _id: v._id, name: v.name, type: v.type, amount: v.amount, date: v.date, color: v.categories_info.color }))
            return res.status(200).json({ message: "Get all the transactions data", data: filter })
        }).catch(err => {
            return res.status(400).json({ message: "Looup collection error!" })
        })
    } catch (error) {
        return res.status(500).json({ message: "Server error!" })
    }
}

module.exports = {
    createCategorie,
    getAllCategories,
    createTransaction,
    getAllTransactions,
    deleteTransaction,
    get_labels
}