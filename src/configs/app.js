require('dotenv').config()

module.exports = {
  port: process.env.PORT || 3000,
  isProduction: process.env.NODE_ENV === 'production',
  mongodbUri: process.env.MONGODB_URI ,
  sendgrid_api_key: process.env.SENDGRID_API_KEY
  
}