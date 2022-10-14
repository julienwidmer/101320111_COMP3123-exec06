const mongoose = require('mongoose');

// Define schema
const NotesSchema = new mongoose.Schema({
    noteTitle: String,
    noteDescription: String,
    priority: {
        type: String,
        enum: ["HIGH", "MEDIUM", "LOW"]
    },
    dateAdded: Date,
    dateUpdated: Date
})

// Create mongodb schema
const Notes = mongoose.model("Notes", NotesSchema)
// Export module
module.exports = Notes