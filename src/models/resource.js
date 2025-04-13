// models/resource.js
const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
    title: String,
    subject: String,
    filePath: String,
    year: String, // <-- Add this
});

module.exports = mongoose.model("Resource", resourceSchema);
