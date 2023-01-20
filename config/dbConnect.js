const mongoose = require('mongoose')

const connectDB = async () => {
  mongoose.set('strictQuery', true)
  try {
    await mongoose.connect(process.env.DATABASE_URI)
  } catch (e) {
    console.log(e)
  }
}

module.exports = connectDB