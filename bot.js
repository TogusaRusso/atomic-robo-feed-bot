'use strict'

const Telegram = require('node-telegram-bot-api')
const http = require('http')
const htmlparser = require('htmlparser2')

const dburi = process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL ||
  'mongodb://localhost:27017'

const MongoClient = require('mongodb').MongoClient
MongoClient.connect(dburi, { server: { auto_reconnect: true } }, function(err, db) {
  if (err) 
    return console.log(err)
  console.log("Connected correctly to mongodb")
  
  const tg = new Telegram(process.env.TOKEN)
  const collection = db.collection('urls')

  parseTitlePage((url) => {
    console.log(`url=${url}`)
    if (url) {
      collection.find({url: url}).toArray((err, urls) => {
        if (err) 
          return console.log(err)
        if (urls.length === 0) {
          console.log(`that's new page`)
          tg.sendPhoto(process.env.CHANNEL, url)
          console.log(`Sending photo ${url}`)
          collection.insertOne({url: url}, (err, result) => {
            if (err)
              return console.log(err)
            console.log('Saved new url in database')
            db.close()
          })
        } else {
          console.log('nothing new here') 
          db.close()
        }
      })
    }
  })
})

function parseTitlePage (cb) {
  const parser = new htmlparser.Parser({
    onopentag: (name, attr) => {
      if (name === 'img' && attr.id === 'cc-comic') {
        cb(attr.src)
      }
    }
  }, {decodeEntities: true})
  http.get('http://www.atomic-robo.com/', (res) => {
    res.on('data', (chunk) => parser.write(chunk))
    .on('end', () => parser.end())
  }).on('error', (e) => {
    console.log(`Got error: ${e.message}`)
  })
}
