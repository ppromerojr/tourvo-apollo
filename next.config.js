require('dotenv').config() 
const nextConfig = { 
 env: {
    GRAPHQL_URL: process.env.GRAPHQL_URL,
  }
}

module.exports = nextConfig