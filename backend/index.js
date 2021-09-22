const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const multer = require('multer');  // Med multer vi kan upload file or image


const authRoute = require('./routes/auth');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const categoryRoute = require('./routes/categories');


dotenv.config();
app.use(express.json()); // Send DATA to the database as a json file 



//MongoDB Connect
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err));


// Med den här functionen vi laddar upp file i Client side
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});


  app.use('/api/auth', authRoute);
  app.use('/api/users', userRoutes);
  app.use('/api/posts', postRoutes);
  app.use('/api/categories', categoryRoute)

app.listen('5000', () => {
    console.log('Server is running on port 5000');
})