# General

## Usage

**Important:** The API is forward-compatible. We take the freedom to add **optional** attributes to endpoints without updating the version number. In this case, you should be aware that a PUT request replaces an entire object. i.e. not specifying a field on an object will **null** the field. To update a single field on e.g. a product you must first GET the product and then PUT the entire product with the new updated field. See example below.

## Authentication

Send the header

`Authtentication: Bearer <token>`

`<token>` can be found at [https://app.detalteq.com/en](https://app.detalteq.com/en) -> Settings -> Generel -> Users. Only users that are not shop users have their API token displayed on the settings page.

We recommand creating a new user for each integration.

## Rate limiting

API requests are subject to potential throttling to limit excess load on our servers.

Throttling of requests is based on a _simple bucket resource model_ (similar to the leaking bucket algorithm, except the bucket fills up instead of leaking). You are free to make API requests until the resource bucket is depleted, after which requests will return an HTTP 429 error.

The current bucket size is 80 and the filling (regen) rate is 8 requests per second. These limitations are subject change but are included within the HTTP response for throttled requests:

```json
{
    "error": "API Resource limit reached.",
    "bucket_size:" "80",
    "bucket_regen": "8"
}
```

## Configs

A list of settings configs can be found [here](https://app.deltateq.com/doc/api/configs.php)
