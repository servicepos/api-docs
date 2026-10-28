# Pagination

## Cursor-based pagination (recommended)

Endpoints that have been migrated to cursor-based pagination accept a `cursor` query parameter. **Use cursor-based pagination whenever an endpoint supports it.** It stays fast regardless of how deep you page, and you will not skip or receive duplicate items when data is created or deleted while you are paging.

The following endpoints support cursor-based pagination:

| Endpoint | Next cursor in response |
| --- | --- |
| `GET /products` | `nextCursor` |
| `GET /inventorylevels` | `meta.next_cursor` |
| `GET /verified-suppliers/sales` | `nextCursor` |
| `GET /verified-suppliers/inventory` | `nextCursor` |

To page through the results:

1. Make the first request with an empty `cursor` parameter, e.g. `?cursor=&paginationPageLength=250`.
2. Read the next cursor from the response and pass it unchanged as `cursor` in the next request. Keep all other query parameters the same.
3. Repeat until the next cursor is `null`.

```bash
curl \
  -H 'Content-Type: application/json' \
  'https://app.deltateq.com/api/products?cursor=&paginationPageLength=250'

curl \
  -H 'Content-Type: application/json' \
  'https://app.deltateq.com/api/products?cursor=eyJQcm9kdWN0LmlkIjoxMjM0LCJfcG9pbnRzVG9OZXh0SXRlbXMiOnRydWV9&paginationPageLength=250'
```

Treat the cursor as an opaque string: do not decode, modify or build it yourself. When `cursor` is set, `paginationStart` is ignored, and cursor-based pagination is only allowed with the default sorting or sorting by id.

## Offset-based pagination (legacy)

Endpoints that have not yet been migrated to cursor-based pagination use the GET parameters `paginationStart` and `paginationPageLength`. The pagination is based on element count.
For example, if you want to access the third page of a pagination with 10 items per page use:

`?paginationStart=20&paginationPageLength=10`

Offset-based pagination is still supported on `GET /products` and `GET /inventorylevels` for backwards compatibility, but we recommend switching to cursor-based pagination on these endpoints.

For all endpoints `paginationPageLength` is limited to **250**. We are currently working on implementing this limit.
