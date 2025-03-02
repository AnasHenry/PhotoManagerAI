const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/profileDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const profileSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  companyName: String,
  area: String,
  eventsManaged: Number,
  industryArea: String,
});

const Profile = mongoose.model('Profile', profileSchema);

app.get('/api/profile', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile);
  } catch (err) {
    res.status(500).send('Error fetching profile details');
  }
});

app.put('/api/profile', async (req, res) => {
  try {
    const updatedProfile = await Profile.findOneAndUpdate({}, req.body, { new: true });
    res.json(updatedProfile);
  } catch (err) {
    res.status(500).send('Error updating profile');
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));