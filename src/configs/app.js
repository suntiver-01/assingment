require('dotenv').config()

module.exports = {
  port: process.env.PORT || 3000,
  isProduction: process.env.NODE_ENV === 'production',
  mongodbUri: process.env.MONGODB_URI || 'mongodb+srv://suntiver:01a02b03c04d05e@cluster0.hbpucav.mongodb.net/?retryWrites=true&w=majority'
}