const axios = require('axios')
const fs = require('fs')
const URL = 'https://app.deltateq.com/doc/api/openapi.json'

axios.get(URL).then((res) => {
  fs.writeFileSync('./openapi/openapi.json', JSON.stringify(res.data))
})
