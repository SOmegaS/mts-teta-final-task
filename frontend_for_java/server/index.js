
const express = require('express')
const path = require('path')
const router = require('./routes/route.js')
const cors = require('cors')


const PORT = process.env.PORT || 3001

const app = express()
app.use(express.json({extended:true}))


app.use(cors())
app.use('/api', router)


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')))
    app.get('*', (request, response) => {
        response.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'))
    })    
}


const start = async () => {
    try {
        app.listen(PORT, () => console.log('started'))
    } catch (err) {
        console.log(err)
    }
}

start()



