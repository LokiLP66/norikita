// import express via require()
// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express')

// create a website via express and serve it on port 80 (http://localhost:80)
const app = express()
app.use(express.static('public'))
const port = process.env.PORT || 80
app.listen(port)
console.log(`Server running on port: ${port}`)


app.get('/', (req, res) => {
	res.sendFile(__dirname + '/web/index.html')
})

app.get('/code', (req, res) => {
	res.sendFile(__dirname + '/web/code.html')
})