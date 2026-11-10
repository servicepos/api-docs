# Pagination

## Cursor-based pagination (recommended)

Endpoints that have been migrated to cursor-based pagination accept a `cursor` query parameter. **Use cursor-based pagination whenever an endpoint supports it.** It stays fast regardless of how deep you page, and you will not skip or receive duplicate items when data is created or deleted while you are paging.

Check the documentation of each endpoint to see whether it supports the `cursor` parameter, and which response field holds the next cursor.

To page through the results:

1. Make the first request with an empty `cursor` parameter, e.g. `?cursor=&paginationPageLength=250`.
2. Read the next cursor from the response (see the endpoint's documentation for the field name) and pass it unchanged as `cursor` in the next request. Keep all other query parameters the same.
3. Repeat until the next cursor is `null`.

```bash
curl \
  -H 'Content-Type: application/json' \
  'https://api.c1st.com/api/products?cursor=&paginationPageLength=250'

curl \
  -H 'Content-Type: application/json' \
  'https://api.c1st.com/api/products?cursor=eyJQcm9kdWN0LmlkIjoxMjM0LCJfcG9pbnRzVG9OZXh0SXRlbXMiOnRydWV9&paginationPageLength=250'
```

Treat the cursor as an opaque string: do not decode, modify or build it yourself. When `cursor` is set, `paginationStart` is ignored, and cursor-based pagination is only allowed with the default sorting or sorting by id.

## Offset-based pagination (legacy)

Endpoints that have not yet been migrated to cursor-based pagination use the GET parameters `paginationStart` and `paginationPageLength`. The pagination is based on element count.
For example, if you want to access the third page of a pagination with 10 items per page use:

`?paginationStart=20&paginationPageLength=10`

Some endpoints support both methods for backwards compatibility. On those endpoints we recommend switching to cursor-based pagination.

`paginationStart` is limited to **2500**. To page beyond the first 2500 items, use cursor-based pagination.
