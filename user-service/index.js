// the first line is loading the library, its a web framework to handle https routes
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser'); // helps request json request body



const app = express() // we are creating an exp app
const port = 3001 // this is the variable having port number where our application will work
// we need to enable json body parser

app.use(bodyParser.json())

// this will be our database

mongoose.connect('mongodb://mongo:27017/users')
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error: ", err));

const UserSchema = new mongoose.Schema({
  name: String,
  email: String
});
const User = mongoose.model('User', UserSchema);
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);

})

app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = new User({ name, email });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error("Error saving: ", err);
    res.status(500).json({ error: "Internal Server Error" });


  }

})

// here we will define our route , the '/' is the route end point here and its listening to it
// then we have request resonse object that we will be sending
// and then we have this respond that we will be sending 
app.get('/', (req, res) => {
  res.send('Hello World!')
})


// before starting the route here we define the server here
app.listen(port, () => {
  // this is what gets printed on the console 
  console.log(`User Service listening on port ${port}`)
})