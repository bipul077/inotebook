const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/inotebook"

const connectToMongo=()=>{
    mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to database');
    })
    .catch((error) => {
      console.error('Error connecting to database:', error);
    });
}
module.exports = connectToMongo;