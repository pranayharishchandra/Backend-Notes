const express = require('express');
const productController = require('../controller/product');

// we have already created server in index.js running on port 3000
// we can't make 2 servers... so we will make 

const router = express.Router();

router
  .get('/', productController.getAllProducts)
  .post('/', productController.createProduct)
  .get('/:id', productController.getProduct)
  .put('/:id', productController.replaceProduct)
  .patch('/:id', productController.updateProduct)
  .delete('/:id', productController.deleteProduct);

exports.router = router;  

// --- index.js --- 
// const productRouter = require('./routes/product')
// server.use('/products',productRouter.router);
