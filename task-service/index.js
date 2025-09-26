// the first line is loading the library, its a web framework to handle https routes
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser'); // helps request json request body

const app = express() // we are creating an exp app
const port = 3002 // this is the variable having port number where our application will work
// we need to enable json body parser
// we are changing the port number here 

app.use(bodyParser.json())
mongoose.connect('mongodb://mongo:27017/tasks')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error: ", err));


const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    userId: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const Task = mongoose.model('Task', TaskSchema);
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);

})

app.post('/tasks', async (req, res) => {
    const { title, description, userId } = req.body;
    try {
        const task = new Task({ title, description, userId });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        console.error("Error saving: ", err);
        res.status(500).json({ error: "Internal Server Error" });


    }

})
// before starting the route here we define the server here
app.listen(port, () => {
    // this is what gets printed on the console 
    console.log(`Task Service listening on port ${port}`)
})