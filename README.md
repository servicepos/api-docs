# Customers 1st OpenAPI site

## Setup (development)

Run `npm run start` to start a local instance of the site - be aware that this dosen't watch for changes in the pages markdown

## Pages

Extra information like code examples and general information about the api is organized in the pages folder. Here sections are seperated in their one markdown files, during the build process, the files are merged into one single markdown file which is used to generate the static html.

## Scripts

`npm run build`: This bundles the pages markdown, then fetches the remote openapi.json from [here](https://api.c1st.com/doc/api/openapi.json) and copies it next to `index-template.html` in `public/`. The page renders it with [Scalar](https://github.com/scalar/scalar), which only renders what's on screen; ReDoc rendered all endpoints up front and froze browsers.

## Changing the html

To change the page (favicon, Scalar version or [configuration](https://github.com/scalar/scalar/blob/main/documentation/configuration.md)) edit `index-template.html`. Keep the slug options there: they keep old ReDoc links like `#tag/Products/operation/searchProduct` working.
