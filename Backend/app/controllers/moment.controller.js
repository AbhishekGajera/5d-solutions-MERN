const db = require("../models");
const Moment = db.moments;

// Create and Save a new Moment
exports.create = async (req, res) => {
  try {
    // Check if files are present
    if (!req.files || req.files.length === 0) {
      res.status(400).send({ message: "At least one image file is required!" });
      return;
    }

    const data = {
      title: req.body.title,
      images: [],
      tags: req.body.tags || [],
      user: req.user,
    };

    // Update the images field with file paths
    req.files.forEach((file) => {
      console.info(file);
      data.images.push(file.filename);
    });

    const moment = new Moment(data);

    const newMoment = await moment.save();

    await moment.save();

    res.send(newMoment);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Moment.",
    });
  }
};

// Update a Moment by the id in the request
exports.update = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }

    const id = req.params.id;

    // Check if files are present
    if (!req.files || req.files.length === 0) {
      res.status(400).send({ message: "At least one image file is required!" });
      return;
    }

    const moment = await Moment.findById(id);

    if (!moment) {
      res.status(404).send({
        message: `Cannot update Moment with id=${id}. Maybe Moment was not found!`,
      });
      return;
    }

    moment.images = [];

    req.files.forEach((file) => {
      moment.images.push(file.path);
    });

    await moment.save();

    res.send({ message: "Moment was updated successfully." });
  } catch (err) {
    res.status(500).send({
      message: "Error updating Moment with id=" + id,
    });
  }
};

// Retrieve all Moments from the database.
exports.findAll = async (req, res) => {
  try {
    const title = req.query.title;
    const condition = title
      ? { title: { $regex: new RegExp(title), $options: "i" } }
      : {};

    const data = await Moment.find(condition);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving moments.",
    });
  }
};

// Find a single Moment with an id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Moment.findById(id);

    if (!data) {
      res.status(404).send({ message: "Not found Moment with id " + id });
    } else {
      res.send(data);
    }
  } catch (err) {
    res.status(500).send({ message: "Error retrieving Moment with id=" + id });
  }
};

// Update a Moment by the id in the request
exports.update = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }

    const id = req.params.id;

    const data = await Moment.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });

    if (!data) {
      res.status(404).send({
        message: `Cannot update Moment with id=${id}. Maybe Moment was not found!`,
      });
    } else {
      res.send({ message: "Moment was updated successfully." });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating Moment with id=" + id,
    });
  }
};

// Delete a Moment with the specified id in the request
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Moment.deleteMany({ user: req.user, _id: id });

    if (!data) {
      res.status(404).send({
        message: `Cannot delete Moment with id=${id}. Maybe Moment was not found!`,
      });
    } else {
      res.send({ message: "Moment was deleted successfully!" });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete Moment with id=" + id,
    });
  }
};

// Delete all Moments from the database.
exports.deleteAll = async (req, res) => {
  try {
    const data = await Moment.deleteMany({ user: req.user });
    res.send({
      message: `${data.deletedCount} Moments were deleted successfully!`,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while removing all moments.",
    });
  }
};
