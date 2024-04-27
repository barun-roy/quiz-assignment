const dotenv = require('dotenv')
const app = require('./app')
require("./src/database/connect")

dotenv.config().parsed;

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})