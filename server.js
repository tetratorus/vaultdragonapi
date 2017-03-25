var Store = require('./db.js').Store
var express = require('express')
const app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

app.set('port', (process.env.PORT || 5000));

app.get('/', (req, res) => {
  res.send('Vault Dragon API: https://github.com/tetratorus/vaultdragonapi')
})

app.post('/object', jsonParser, (req,res) => {
  if (!req.body) res.sendStatus(400)
  Store.sync().then(() => {
    // Table created
    for(var key in req.body) {
      return Store.create({
        key,
        value: req.body[key],
        timestamp: new Date().getTime()
      })
    }
  }).then((result) => {
    res.send(JSON.stringify(result))
  })
})

app.get('/get/:key', (req, res) => {
  if (req.query.timestamp) {
    Store.sync().then(() => {
      return Store.findOne({
        where: {
          key: req.params.key,
          timestamp: req.query.timestamp
        }
      })
    }).then((result) => {
      res.send(result.value)
    })
  } else {
    Store.sync().then(() => {
      return Store.findOne({
        order: '"timestamp" DESC',
        where: {
          key: req.params.key
        }
      })
    }).then((result) => {
      res.send(result.value)
    })
  }
})



app.listen(app.get('port'))
