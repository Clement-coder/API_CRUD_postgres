const pool = require('../db/db');
const productSchema = require('../joi_valids/products.valid');
exports.createProduct = async (req, res) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Get uploaded image filename from multer
  const image = req.file?.filename;

  const { name, description, price, quantity, user_id } = req.body;

  try {
    const newProduct = await pool.query(
      `INSERT INTO products (name, description, image, price, quantity, user_id) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, description, image, price, quantity, user_id]
    );

    res.status(201).json(newProduct.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await pool.query('SELECT * FROM products');
    res.json(products.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, image, price, quantity, user_id } = req.body;
  try {
    const updated = await pool.query(
      `UPDATE products SET name = $1, description = $2, image = $3, price = $4, quantity = $5, user_id = $6 
       WHERE id = $7 RETURNING *`,
      [name, description, image, price, quantity, user_id, id]
    );
    if (updated.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updated.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    if (deleted.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
