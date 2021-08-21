const express = require('express')
const axios = require('axios').default;
const app = express()
const port = process.env.PORT || 8080
const accountSid = 'AC8fd962c55c33e67965461ea8875f2ca3'; 
const authToken = 'bcc5e866edd8df5a795901efb0b15b9c'; 
const client = require('twilio')(accountSid, authToken); 
app.use(express.json())

app.get('/ticker', (req, res) => {
    axios.get('https://api.wazirx.com/api/v2/tickers')
    .then(function (response) {
      // handle success
      let data = response.data
      let obj = {
          btc: data.btcinr.sell,
          eth: data.ethinr.sell,
          bnb: data.bnbinr.sell,
          matic: data.maticinr.sell,
          doge: data.dogeinr.sell,
          etc: data.etcinr.sell,
          uft: data.uftinr.sell,
      }
      res.send(obj)
    })
    .catch(function (error) {
      // handle error
      res.error(error)
    })
})
app.post('/sms', (req, res) => {
    console.log(req.body);
    client.messages 
      .create({ 
         body: 'Your shopsy code is - ' + req.body.code,  
         messagingServiceSid: 'MG7303e8ec0e4f230feefcf6df16f16924',      
         to: req.body.number 
       }) 
      .then(message => console.log(message.sid)) 
      .done();
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
