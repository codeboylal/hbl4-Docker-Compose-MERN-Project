const mongoose = require('mongoose')

// "mongo" is the compose service name, resolved on the internal docker network.
const mongoUri = process.env.MONGO_URI || 'mongodb://mongo:27017/cinema'

mongoose
    .connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

db.once('open', () => console.log('MongoDB connected'))

module.exports = db
