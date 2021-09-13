# ServicePOS OpenAPI site

## Setup (development)

Run `npm run start` to start a local instance of the ReDoc site - be aware that this dosen't watch for changes in the pages markdown

## Pages

Extra information like code examples and general information about the api is organized in the pages folder. Here sections are seperated in their one markdown files, during the build process, the files are merged into one single markdown file which is used to generate the static html.

## Scripts

`npm run build`: This bundles the pages markdown, then fetches the remote openapi.json from https://app.deltateq.com/doc/api/openapi.json and builds a zero-dep static html file from that.

## Changing the theme and html

To update/change the theme edit the `theme.json` file, available theme options can be found at [ReDoc docs](https://redoc.ly/docs/api-reference-docs/configuration/theming/)

To change the html (change font, favicon etc) edit the `index-template.hbs`