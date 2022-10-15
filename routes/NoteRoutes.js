const express = require("express");
const NoteModel = require('../models/NotesModel');
const routes = express.Router();

routes.post('/notes', async (req, res) => {
    // Validate request
    if(JSON.stringify(req.body) == "{}") {
        // Client side error
        return res.status(400).send({message: "Note content can not be empty"});
    }

    // Create new Note
    const newNote = new NoteModel(req.body);
    try {
        await newNote.save();
        res.status(201).send(newNote);
    } catch (error) {
        // Server side error
        res.status(500).send({message: `Error while inserting new note: ${error}`});
    }
});


routes.get('/notes', async (req, res) => {
    // Retrieve all Notes
    try {
        const notes = await NoteModel.find();

        if (notes != "") {
            res.status(200).send(notes);
        } else {
            // Client side error
            res.status(400).send({message: "No notes found."});
        }
    } catch (error) {
        // Server side error
        res.status(500).send({message: `Error while retrieving notes: ${error}`})
    }
});


routes.get('/notes/:noteId',async (req, res) => {
    // Retrieve single Note with noteId
    try {
        const note = await NoteModel.findById(req.params.noteId);
        if (note) {
            res.status(200).send(note);
        } else {
            // Client side error
            res.status(400).send({message: `No note found with noteId: ${req.params.noteId}`});
        }
    } catch (error) {
        // Server side error
        res.status(500).send(
            {message: `Error while retrieving note with given noteId "${req.params.noteId}": ${error}`}
        );
    }
});


routes.put('/notes/:noteId', async (req, res) => {
    // Validate request
    if(JSON.stringify(req.body) == "{}") {
        // Client side error
        return res.status(400).send({message: "Note content can not be empty"});
    }

    // Update Note with noteId
    try {
        await NoteModel.findByIdAndUpdate(req.params.noteId, req.body);
        const udatedNote = await NoteModel.findById(req.params.noteId);

        if (udatedNote) {
            res.status(201).send(udatedNote);
        } else {
            // Client side error
            res.status(400).send({message: `No note to update found with noteId: ${req.params.noteId}`});
        }
    } catch (error) {
        res.status(500).send(
            // Server side error
            {message: `Error while updating note with given noteId "${req.params.noteId}": ${error}`}
        )
    }
});


routes.delete('/notes/:noteId', async (req, res) => {
    // Delete Note with noteId
    try {
        const note = await NoteModel.findByIdAndRemove(req.params.noteId);

        if (note) {
            res.status(200).send(note);
        } else {
            // Client side error
            res.status(400).send({message: `No note to remove with noteId: ${req.params.noteId}`});
        }
    } catch (error) {
        // Server side error
        res.status(500).send({message: `Error while removing note with given noteId: ${error}`})
    }
});

module.exports = routes;