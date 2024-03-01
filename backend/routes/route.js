const express = require('express')
const router = express.Router()

const contoller = require('../controllers/controller')

router.post('/categories/create', contoller.createCategorie)
router.get('/categories/findAll', contoller.getAllCategories)

router.post('/transaction/create', contoller.createTransaction)
router.get('/transaction/findAll', contoller.getAllTransactions)
router.delete('/transaction/deleteById', contoller.deleteTransaction)

router.get('/labels', contoller.get_labels)

module.exports = router