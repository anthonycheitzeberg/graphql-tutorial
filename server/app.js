const express = require('express');
/**
 * Old school way: const graphqlHTTP = require('express-graphql');
 * New ways:
 *  (a)  const graphqlHTTP = require('express-graphql').graphqlHTTP; 
 *  (b)  const { graphqlHTTP } = require('express-graphql')
 */
const graphqlHTTP = require('express-graphql').graphqlHTTP; 

const PORT = 4000;

const app = express();

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    // pass in a schema property
    
}));

app.listen(PORT, () => {
    console.log(`now listening for requests on port ${PORT}`);
});