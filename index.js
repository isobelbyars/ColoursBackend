const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

let colours = [
    {
      name: "pink",
      id: 0,
      warm: true
    },
    {
      name: "red",
      id: 1,
      warm: true
    },
    {
      name: "blue",
      id: 2,
      warm: false
    },
    {
      name: "orange",
      id: 3,
      warm: true
    },
    {
      name: "green",
      id: 4,
      warm: false
    },
    {
      name: "yellow",
      warm: true,
      id: 5
    },
    {
      name: "grey",
      warm: false,
      id: 6
    },
    {
      name: "black",
      warm: false,
      id: 7
    },
    {
      name: "white",
      warm: true,
      id: 8
    },
    {
      name: "brown",
      warm: false,
      id: 9
    },
    {
      name: "silver",
      warm: false,
      id: 10
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})
  
app.get('/api/colours', (request, response) => {
  response.json(colours)
})

app.get('/api/colours/:id', (request, response) => {
  const id = Number(request.params.id)
  const colour = colours.find(colour => colour.id === id)

  if (colour) {
    response.json(colour)
  } else {
    response.status(404).end()
  }
  
})

app.post('/api/colours', (request, response) => {
  
  // determine the id of the new entry
  const maxID = colours.length > 0
    ? Math.max(...colours.map(n => n.id))
    : 0


  const body = request.body
  // error if no colour name is given
  if (!body.name) {
    return response.status(400).json({
      error: "colour name missing"
    })
  }

  const colour = {
    name: body.name,
    warm: body.warm || false,
    id: maxID + 1
  }
  
  colours = colours.concat(colour)

  response.json(colour)
})

app.delete('/api/colours/:id', (request, response) => {
  const id = Number(request.params.id)
  colours = colours.filter(colour => colour.id !== id)

  response.status(204).end()
})
  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})