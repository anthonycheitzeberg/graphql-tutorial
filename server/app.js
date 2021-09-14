const express = require('express');
/**
 * Old school way: const graphqlHTTP = require('express-graphql');
 * New ways:
 *  (a)  const graphqlHTTP = require('express-graphql').graphqlHTTP; 
 *  (b)  const { graphqlHTTP } = require('express-graphql')
 */
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const uri = "mongodb+srv://heitzebergUser:heitzebergUser@gql-tutorial.vdlxe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = 4000;
const app = express();

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