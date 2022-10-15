const express = require('express');
const notesRoutes = require("./routes/NoteRoutes");

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoose = require('mongoose');
const DB_URL = "mongodb+srv://admin:<PASSWORD>@cluster0.adpukiy.mongodb.net/fullstackdev?retryWrites=true&w=majority";

mongoose.Promise = global.Promise;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use("/api/v1/", notesRoutes);

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
});

app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});