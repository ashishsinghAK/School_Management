const express = require('express');
const sequelize = require('./config/Database')
const schoolRoute = require('./Route/SchoolRoute')

const app = express();
const PORT = 4000
app.use(express.json());

app.get("/",(req,res) => {
    return res.status(200).json({
        message:"Welcome to node Server"
    })
})

app.use('/',schoolRoute)

sequelize.sync().then(() => {
    app.listen(PORT,()=> {
        console.log(`Server is listen on ${PORT}`)
    })
}).catch((err) => {
    console.log('Error !',err)
})

