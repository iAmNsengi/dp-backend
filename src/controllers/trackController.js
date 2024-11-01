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
