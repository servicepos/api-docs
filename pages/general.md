# General

## Help and support

If you have any questions regarding the API we are happy to help you via our API support at <api@c1st.com>.

Please be specific and include the following information:

 * A detailed description of the problem with a step-by-step description of what you do and what happens.
 * Store details, specifically the StoreId.
 * If possible, include a complete request and response.
 * Screenshots, if possible.
 * Other relevant or helpful information.

## Usage

The API is forward-compatible. We take the freedom to add **optional** attributes to endpoints without notice. In this case, you should be aware that a PUT request replaces an entire object. i.e. not specifying a field on an object will **null** the field. To update a single field on e.g. a product you must first GET the product and then PUT the entire product with the new updated field. See example below.

We may introduce breaking changes to endpoints. In such case, you will be contacted via the email provided at the API token setup page with a transition period. 

## Authentication

Send the header

`Authorization: Bearer <token>`

`<token>` can be found at [https://app.c1st.com/en](https://app.c1st.com/en) -> Settings -> API -> API users.

We recommend creating a new user for each integration.

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

We urge you to use the API in a fair manner, and not introducing unnecessary load. 
Constantly retrieving all data or regularly updating the entire product catalog via bulk operations are examples of what we would consider unfair API usage.
Instead, use hooks and only update changed products.
Customers 1st monitors API usage to identity excessive API usage. We will try to get in contact on excessive use, but we may be forced to reduce limits until the matter has been resolved.

## Configs

A list of settings configs can be found [here](https://api.c1st.com/doc/api/configs.php)
