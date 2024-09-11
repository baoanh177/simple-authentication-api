const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  email: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true,
    min: 6
  },
  accessToken: String,
  refreshToken: String,
})

const User = mongoose.model("User", schema)

module.exports = { User }