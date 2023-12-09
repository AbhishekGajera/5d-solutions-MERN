module.exports = (app) => {
  const moments = require("../controllers/moment.controller.js");
  const authMiddleware = require("../middlewares");

  const multer = require("multer");
  const path = require("path");
  const fs = require("fs");
  const { v4: uuidv4 } = require("uuid");

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, "../uploads");
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const fileName = uuidv4() + path.extname(file.originalname);
      cb(null, fileName);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("File type not allowed!"), false);
    }
  };

  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 15 * 1024 * 1024 }, // 15MB
  });

  var router = require("express").Router();

  // Create a new Moment
  router.post("/", authMiddleware, upload.array("images", 5), moments.create);

  // Retrieve all Moments
  router.get("/", moments.findAll);

  // Retrieve a single Moment with id
  router.get("/:id", moments.findOne);

  // Update a Moment with id
  router.put("/:id", moments.update);

  // Delete a Moment with id
  router.delete("/:id", moments.delete);

  // delete all moments
  router.delete("/", moments.deleteAll);

  app.use("/api/moments", router);
};
