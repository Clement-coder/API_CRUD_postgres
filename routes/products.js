const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploads.js');
const productController = require('../controllers/productsController.js');

router.post('/', upload.single('image'), productController.createProduct);
router.get('/', productController.getProducts);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
