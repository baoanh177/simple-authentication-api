
const mongoose = require('mongoose')
const URL = process.env.DB_URL
const connectDB = async () => {
  try {
    await mongoose.connect(
      URL,
      { useNewUrlParser: true, useUnifiedTopology: true, dbName: "beauty-and-cleanic" }
    )
    console.log('Connected to mongoDB')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB