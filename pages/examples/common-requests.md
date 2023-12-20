## Common Requests

### Fetch updated ressources since given timestamp
A common operation you might want to do is fetch all the products from Customers 1st that where changed since the last time you "checked". The way to do this is to use the `updated_after` query parameter on the products search [endpoint](https://api-docs.c1st.com/#tag/Products/operation/searchProduct). So lets say for example today's date is the 20. of December and you want every product that was changed since the 19. of December. You would make a request like so:

```bash
curl \
  -H 'Content-Type: application/json' \
  https://app.deltateq.com/api/products?updated_after=2023-12-19 00:00:00
```

This would then return a list of products updated after that date. If the amount of products changed are greater than 50 you would still have to paginate through the list using the `paginationStart` query paramater like usual.

#### Stock changes
To achive the same for stocktransaction, the request is almost the same as the example above. Here you use the search stockstransactions [endpoint](https://api-docs.c1st.com/#tag/StockTransactions/operation/getStockTransactions) with the query paramenter `committed_after`. So to get all stock transactions after the 19. of December 2023 you would make a request like so:

```bash
curl \
  -H 'Content-Type: application/json' \
  https://app.deltateq.com/api/stocktransactions?committed_after=2023-12-19 00:00:00
```
