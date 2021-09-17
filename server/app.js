const express = require('express');
const dotenv = require('dotenv');
/**
 * Old school way: const graphqlHTTP = require('express-graphql');
 * New ways:
 *  (a)  const graphqlHTTP = require('express-graphql').graphqlHTTP; 
 *  (b)  const { graphqlHTTP } = require('express-graphql')
 */
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();

// make environment variables available throughout the applications:
dotenv.config()

// allow cross-origin requests
app.use(cors())

const uri = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@gql-tutorial-shard-00-00.x1m61.mongodb.net:27017,gql-tutorial-shard-00-01.x1m61.mongodb.net:27017,gql-tutorial-shard-00-02.x1m61.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-pceggr-shard-0&authSource=admin&retryWrites=true&w=majority`;
const PORT = 4000;

// connect to db in mongoDB
try {
    mongoose.connect(
        uri,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => console.log("Mongoose is connected")
    );

} catch (e) {
    console.log("could not connect");
}

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    // pass in a schema property
    schema,
    graphiql: true
}));

app.listen(PORT, () => {
    console.log(`now listening for requests on port ${PORT}`);
});