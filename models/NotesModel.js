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

/*
JSON example:
{
    "noteTitle": "Hello World",
    "noteDescription": "Lorem Ipsum Dolor Sit Amet",
    "priority": "LOW",
    "dateAdded": "2022-10-13T12:24:17.501Z",
    "dateUpdated": "2022-10-15T00:24:17.501Z"
}
*/

// Create mongodb schema
const Notes = mongoose.model("Notes", NotesSchema);
// Export module
module.exports = Notes;