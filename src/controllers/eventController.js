const Event = require('../models/Event');

// Create new event
exports.createEvent = async (req, res) => {
  try {
    const eventData = { ...req.body };
    
    // Handle image upload
    if (req.file) {
      eventData.image = req.file.path;
    }

    // Parse date if it's sent as string
    if (eventData.date) {
      eventData.date = new Date(eventData.date);
    }

    const event = new Event(eventData);
    await event.save();
    
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({
      message: 'Error creating event',
      error: error.message
    });
  }
};

// Get all events with filtering
exports.getEvents = async (req, res) => {
  try {
    const {
      status,
      eventType,
      featured,
      startDate,
      endDate,
      limit = 10,
      page = 1
    } = req.query;

    // Build query
    const query = {};
    
    if (status) query.status = status;
    if (eventType) query.eventType = eventType;
    if (featured) query.featured = featured === 'true';
    
    // Date range filter
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    // Execute query with pagination
    const events = await Event.find(query)
      .sort({ date: 1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    // Get total count for pagination
    const total = await Event.countDocuments(query);

    res.json({
      events,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching events',
      error: error.message
    });
  }
};

// Get single event
exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching event',
      error: error.message
    });
  }
};

// Update event
exports.updateEvent = async (req, res) => {
  try {
    const updates = { ...req.body };
    
    // Handle image upload
    if (req.file) {
      updates.image = req.file.path;
    }

    // Parse date if it's sent as string
    if (updates.date) {
      updates.date = new Date(updates.date);
    }

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    res.status(400).json({
      message: 'Error updating event',
      error: error.message
    });
  }
};

// Delete event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting event',
      error: error.message
    });
  }
};

// Get upcoming events
exports.getUpcomingEvents = async (req, res) => {
  try {
    const events = await Event.find({
      date: { $gte: new Date() },
      status: 'upcoming'
    })
    .sort({ date: 1 })
    .limit(5);
    
    res.json(events);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching upcoming events',
      error: error.message
    });
  }
};

// Update event status
exports.updateEventStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    res.status(400).json({
      message: 'Error updating event status',
      error: error.message
    });
  }
};
