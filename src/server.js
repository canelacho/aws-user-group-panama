'use strict'

const express = require('express')
const https = require('https')
const app = express()
const path  = require('path')
const port = 80
const sslPort = 443
const credentials  = require('./private/certs')
const fs = require('fs')
const filePath = 'src/temp.txt'
const morgan = require('morgan')

app
  .use(morgan('dev'))
  // .use(express.static(path.join(__dirname, '/public')))
  .use(express.static('public'))
  .use(express.json()) // for parsing application/json
  .use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.get('/health-check', (req, res) => res.sendStatus(200))

app.get('/', (req, res) => {
  res.sendFile('/index.html')
})

app.post('/register', (req, res) => {
  console.log(req.body)
  
  const data = req.body.name + ','
  fs.appendFileSync(filePath, data, 'utf8',function(err) {
    if (err) throw err;
    console.log("Data is appended to file successfully.")
  })

  res.send(`Usuario registrado con exito`)
})

app.get('/get-users', (req, res) => {
  console.log('me invocaron')
  let content = fs.readFileSync(filePath, "utf-8")
    console.log(content)
    let users = content.split(",")
    let i=0
    for(i in users){
      users[i] == "" ? users.splice(i,1) : false
    }
    res.send(users)
})

app.get('/clear-list', (req, res) => {
  const data = ''
  fs.writeFileSync(filePath, data)
  res.send('todos los usuarios')
})

app.get('/status', (req, res) => {
  res.sendFile('/status.html')
})

app.listen(port, () => {
  console.log(`App runing on ${port} port`)
})

https.createServer(credentials, app)
  .listen( sslPort, () => {
    console.log(`HTTPS Server Started at port ${sslPort}... Meetup Web`)
  })