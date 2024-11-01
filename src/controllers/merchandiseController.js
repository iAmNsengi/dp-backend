const Merchandise = require("../models/Merchandise");

// Add this constant at the top of the file
const VALID_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];

// Create new merchandise
exports.createMerchandise = async (req, res) => {
  try {
    const { name, description, price, category, sizes, stockCount } = req.body;

    // Parse sizes string into array if it's a string
    const sizesArray = typeof sizes === 'string' ? [sizes] : sizes;

    // Validate sizes
    if (sizesArray && !sizesArray.every(size => VALID_SIZES.includes(size))) {
      return res.status(400).json({ 
        message: `Invalid size(s). Allowed sizes are: ${VALID_SIZES.join(', ')}`
      });
    }

    // Handle multiple image uploads
    const images = req.files.map((file) => file.path);

    const merchandise = new Merchandise({
      name,
      description,
      price,
      category,
      images,
      sizes: sizesArray || [],
      stockCount,
      inStock: Boolean(stockCount),
    });

    await merchandise.save();
    res.status(201).json(merchandise);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all merchandise
exports.getAllMerchandise = async (req, res) => {
  try {
    const merchandise = await Merchandise.find().sort({ createdAt: -1 });
    res.json(merchandise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single merchandise item
exports.getMerchandise = async (req, res) => {
  try {
    const merchandise = await Merchandise.findById(req.params.id);
    if (!merchandise) {
      return res.status(404).json({ message: "Merchandise not found" });
    }
    res.json(merchandise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update merchandise
exports.updateMerchandise = async (req, res) => {
  try {
    const updates = { ...req.body };

    // Validate sizes if included in update
    if (updates.sizes) {
      const sizesArray = JSON.parse(updates.sizes);
      if (!sizesArray.every(size => VALID_SIZES.includes(size))) {
        return res.status(400).json({ 
          message: `Invalid size(s). Allowed sizes are: ${VALID_SIZES.join(', ')}`
        });
      }
      updates.sizes = sizesArray;
    }

    // Handle image updates if new files are uploaded
    if (req.files && req.files.length > 0) {
      updates.images = req.files.map((file) => file.path);
    }

    const merchandise = await Merchandise.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!merchandise) {
      return res.status(404).json({ message: "Merchandise not found" });
    }

    res.json(merchandise);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete merchandise
exports.deleteMerchandise = async (req, res) => {
  try {
    const merchandise = await Merchandise.findByIdAndDelete(req.params.id);
    if (!merchandise) {
      return res.status(404).json({ message: "Merchandise not found" });
    }
    res.json({ message: "Merchandise deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update stock count
exports.updateStock = async (req, res) => {
  try {
    const { stockCount } = req.body;
    const merchandise = await Merchandise.findByIdAndUpdate(
      req.params.id,
      {
        stockCount,
        inStock: stockCount > 0,
      },
      { new: true }
    );

    if (!merchandise) {
      return res.status(404).json({ message: "Merchandise not found" });
    }

    res.json(merchandise);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
