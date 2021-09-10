# ServicePOS OpenAPI site

## Setup (development)
In .redocly.yaml set

`apiDefinitions:
  main: path/to/public/openapi.json
`

Then run `npm run bundle-local && npm run start` to start a local instance of the ReDoc site

## Scripts
`npm run build`: Fetches the remote openapi.json from https://app.deltateq.com/doc/api/openapi.json and builds a zero-dep static html file from that.

`npm run build-local`: Does the same as `build` but with the local openapi file

## Changing the theme and html
To update/change the theme edit the `theme.json` file, available theme options can be found at [ReDoc docs](https://redoc.ly/docs/api-reference-docs/configuration/theming/)

To change the html (change font, favicon etc) edit the `index-template.hbs`