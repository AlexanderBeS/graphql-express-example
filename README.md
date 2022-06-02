# graphql-express-example

## Start

node server.js

## Make request

### GraphiQl

{ 
    rollDice(numDice: 3, numSides: 6)
}

### Console

fetch(
'/graphql', 
    {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json', 
        },
        body: JSON.stringify({ 
            query, 
            variables: { dice, sides }, 
        })
    }
)
.then(r => r.json())
.then(data => console.log('data returned:', data));