const validateMerchandise = (req, res, next) => {
  const { name, price, category } = req.body;
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push('Valid name is required (minimum 2 characters)');
  }

  if (!price || isNaN(price) || price < 0) {
    errors.push('Valid price is required');
  }

  if (!category) {
    errors.push('Category is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

module.exports = { validateMerchandise };
