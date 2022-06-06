var express = require('express');
var {graphqlHTTP} = require('express-graphql');
var {buildSchema} = require('graphql');
const RandomDie = require("./RandomDieClass");
const Message = require("./MessageClass");

// Maps username to content
var fakeDatabase = {};
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
    type RandomDie {
      numSides: Int!
      rollOnce: Int!
      roll(numRolls: Int!): [Int]
    }

    type Query {
        ip: String
        getDie(numSides: Int): RandomDie
        hello: String
        quoteOfTheDay: String
        random: Float!
        rollDice(numDice: Int!, numSides: Int): [Int]
        getMessage(id: ID!): Message
    }
    
    input MessageInput {
        content: String
        author: String
    }
    
    type Message {
        id: ID!
        content: String
        author: String
    }
    
    type Mutation {
        createMessage(input: MessageInput): Message
        updateMessage(id: ID!, input: MessageInput): Message
    }
`);



const loggingMiddleware = (req, res, next) => {
    console.log('ip:', req.ip);
    next();
}

// The root provides a resolver function for each API endpoint
var root = {
    ip: function (args, request) {
        return request.ip;
    },
    getDie: ({numSides}) => {
        return new RandomDie(numSides || 6);
    },
    hello: () => {
        return 'Hello world!';
    },
    quoteOfTheDay: () => {
        return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
    },
    random: () => {
        return Math.random();
    },
    rollDice: ({numDice, numSides}) => {
        var output = [];
        for (var i = 0; i < numDice; i++) {
            output.push(1 + Math.floor(Math.random() * (numSides || 6)));
        }
        return output;
    },

    getMessage: ({id}) => {
        if (!fakeDatabase[id]) {
            throw new Error('no message exists with id ' + id);
        }
        return new Message(id, fakeDatabase[id]);
    },
    createMessage: ({input}) => {
        // Create a random id for our "database".
        var id = require('crypto').randomBytes(10).toString('hex');

        fakeDatabase[id] = input;
        return new Message(id, input);
    },
    updateMessage: ({id, input}) => {
        if (!fakeDatabase[id]) {
            throw new Error('no message exists with id ' + id);
        }
        // This replaces all old data, but some apps might want partial update.
        fakeDatabase[id] = input;
        return new Message(id, input);
    },
};


var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
