const express = require('express');
const cors = require('cors');
const connection=require('./database/index.js')
require('./database/user.js')
require('./database/game.js')
require('./database/electronics.js')


const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());

// app.use('/aa/',Router)

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });