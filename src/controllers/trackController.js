const Track = require("../models/Track");

exports.createTrack = async (req, res) => {
  try {
    const { title, featuring } = req.body;
    const coverImage = req.files["cover"][0].path;

    const track = new Track({
      title,
      featuring,
      coverImage,
    });

    await track.save();
    res.status(201).json(track);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getTracks = async (req, res) => {
  try {
    const tracks = await Track.find().sort({ releaseDate: -1 });
    res.json(tracks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTrack = async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);
    if (!track) {
      return res.status(404).json({ message: "track not found" });
    }
    res.json(track);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTrack = async (req, res) => {
  try {
    const updates = { ...req.body };
    
    // Handle cover image update if provided
    if (req.files && req.files["cover"]) {
      updates.coverImage = req.files["cover"][0].path;
    }

    const track = await Track.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!track) {
      return res.status(404).json({ message: "Track not found" });
    }

    res.json(track);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTrack = async (req, res) => {
  try {
    const track = await Track.findByIdAndDelete(req.params.id);
    
    if (!track) {
      return res.status(404).json({ message: "Track not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
