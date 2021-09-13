const URL = 'https://app.deltateq.com/doc/api/openapi.json'
const axios = require('axios')
const fs = require('fs')

axios.get(URL).then((res) => {
  let spec = res.data

  // Set logo
  spec.info['x-logo'] = {
    url: 'https://servicepos.com/wp-content/uploads/2021/08/servicepos-logo-01.svg',
    backgroundColor: '#FFFFFF',
    altText: 'ServicePOS Logo',
  }

  fs.writeFileSync('./spec.json', JSON.stringify(spec))
})
