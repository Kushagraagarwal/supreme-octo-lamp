const express = require('express')
const axios = require('axios').default;
const app = express()
const port = 3000


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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})