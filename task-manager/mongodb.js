// CRUD create read update delete

const { MongoClient } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log('Unabel to connect to database!')
    }

    const db = client.db(databaseName)

    db.collection('users')
  }
)
