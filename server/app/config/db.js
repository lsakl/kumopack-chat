const { MongoClient } = require('mongodb');

const mongoClient = new MongoClient(process.env.MONGO_DB_SERVER, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoClient.connect()
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

module.exports = mongoClient.db("chat");