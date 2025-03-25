const express = require('express')
const cors = require('cors')
const connection = require('./database/index.js')
require('./database/user.js')
require('./database/game.js')
require('./database/electronics.js')

const routes = require('./routers')

const PORT = 2080
const app = express()

app.use(express.json())
app.use(cors())


app.use('/api', routes)

app.use((err, req, res,) => {
    
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' })
})
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})