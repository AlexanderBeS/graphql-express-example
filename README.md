# graphql-express-example

## Start

node server.js

## Make request

### GraphiQl
```
{ 
    rollDice(numDice: 3, numSides: 6)
}


{
  getDie(numSides: 6) {
    rollOnce
    roll(numRolls: 3)
  }
}

{ 
  getMessage(id: "3bea0e86d05c6e91b5d4")
  {id, author, content}
}

mutation {
  createMessage(input: {
    author: "andy",
    content: "hope is a good thing",
  }) {
    id
  }
}
```
### Console
```
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
```


Mutation example

```
mutation {
  createMessage(input: {
    author: "andy",
    content: "hope is a good thing",
  }) {
    id
  }
}
```

```
var author = 'andy';
var content = 'hope is a good thing';
var query = `mutation CreateMessage($input: MessageInput) {
  createMessage(input: $input) {
    id
  }
}`;

fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query,
    variables: {
      input: {
        author,
        content,
      }
    }
  })
})
  .then(r => r.json())
  .then(data => console.log('data returned:', data));
```