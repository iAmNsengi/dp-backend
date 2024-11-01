const Merchandise = require('../models/Merchandise');

// Create new merchandise
exports.createMerchandise = async (req, res) => {
  try {
    const { name, description, price, category, sizes, stockCount } = req.body;
    
    // Handle multiple image uploads
    const images = req.files.map(file => file.path);

    const merchandise = new Merchandise({
      name,
      description,
      price,
      category,
      images,
      sizes: sizes ? JSON.parse(sizes) : [],
      stockCount
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
      return res.status(404).json({ message: 'Merchandise not found' });
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
    
    // Handle image updates if new files are uploaded
    if (req.files && req.files.length > 0) {
      updates.images = req.files.map(file => file.path);
    }

    if (updates.sizes) {
      updates.sizes = JSON.parse(updates.sizes);
    }

    const merchandise = await Merchandise.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!merchandise) {
      return res.status(404).json({ message: 'Merchandise not found' });
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
      return res.status(404).json({ message: 'Merchandise not found' });
    }
    res.json({ message: 'Merchandise deleted successfully' });
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
        inStock: stockCount > 0 
      },
      { new: true }
    );

    if (!merchandise) {
      return res.status(404).json({ message: 'Merchandise not found' });
    }

    res.json(merchandise);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
