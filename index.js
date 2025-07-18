const express = require('express');
const app = express();
const connDb = require('./config/db');
app.use(express.json());

const User = require('./models/users.models')
app.get('/',(req,res)=>{
    res.send("hello welcome");
})
app.post('/users', async (req, res) => {
  try {
    
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    const saved = await user.save();
    console.log(saved);
    res.status(201).json(saved); 
  } catch (err) {
    console.log('some problem occurred', err);
    res.status(500).json({ error: 'Failed to save user' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find(); 
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});
app.delete('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      },
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to update user' });
  }
});


app.listen(5000, async () => {
  try {
    await connDb();
    console.log('Server started on port 5000');
  } catch (err) {
    console.log('Error while connecting to the database');
  }
});