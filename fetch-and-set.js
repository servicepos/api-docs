const URL = 'https://app.deltateq.com/doc/api/openapi.json'
const axios = require('axios')
const fs = require('fs')

const description = fs.readFileSync('./description.md').toString()

axios.get(URL).then((res) => {
  let spec = res.data

  // Set logo
  spec.info['x-logo'] = {
    url: 'https://servicepos.com/wp-content/uploads/2021/08/servicepos-logo-01.svg',
    backgroundColor: '#FFFFFF',
    altText: 'ServicePOS Logo',
  }

  let tags = []

  // Get all the tags in the spec - pain
  for (const path in spec.paths) {
    for (const action in spec.paths[path]) {
      if (spec.paths[path][action].tags !== undefined) {
        tags.push(...spec.paths[path][action].tags)
      }
    }
  }

  // Remove duplicates
  tags = tags.filter((value, index, self) => self.indexOf(value) === index)

  spec['x-tagGroups'] = [
    {
      name: 'Endpoints',
      tags: tags,
    },
  ]

  // Set description
  spec.info.description = description

  fs.writeFileSync('./spec.json', JSON.stringify(spec))
})

// Fetch resthooks
axios.get('https://app.deltateq.com/api/hooks/events').then((res) => {
  let resthooks = res.data.items.join('\n')
  fs.writeFileSync('./pages/_rest-hook-events.md', resthooks)
})
