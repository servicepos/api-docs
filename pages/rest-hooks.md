# Hooks

The Customers 1st API supports [REST Hooks](http://resthooks.org/). This allows you to subscribe to events in our system and get notified via a callback url immediately.

To listen for events,

`POST /api/hooks`
with JSON object

```json
{
    "event": "<event>",
    "url": "<url>"
}
```

This call returns a unique id for that subscription that is needed to manage the subscription.

When the event triggers in our system, we will POST to the specified `url` with a relevant payload, for instance the product that was created in case of `product.created`.

Events can be:

```js
#include "pages/_rest-hook-events.md"
```

To unsubscribe
`DELETE /api/hooks/{id}`
You can also unsubscribe by returning status code 410 (Gone) when your callback url is notified.

REST hooks can also be specified via the app under Settings -> API.

If the request returns **408** (Request Timeout), **429** (Too Many Requests) or **5xx** (Server Error) the server will **retry a maximum of 3 times, with an increasing interval of 30, 60, and finally 120 minutes**, after which the hook will be considered failed.

## Suppress Hooks

When using the API to make changes to your store, for instance create products, these interactions will trigger events like `product.created` just like using the app would.

In some cases this behaviour is not desired since it can create infinite loops between services, for instance stock sync between Customers 1st and e-conomic.

To avoid this, interact with the API with the following header
`X-Suppress-Hooks:`
The content of the header doesn't matter and is ignored.

## Validate Hooks

All resthooks from Customers 1st are signed using a store's signing secret. The signature is set in a header called `X-C1st-Webhook-Signature`. The secret can be changed under api settings or set using the api by changing the store config `resthook_signing_secret`

To validate a resthook, you need to calculate the HMAC of the request payload using the signing secret.

Here is an example in Laravel/PHP

```php
    public function validateResthook(\Illuminate\Http\Request $request)
    {
        $signature = $request->header('X-C1st-Webhook-Signature');

        $secret = "resthook_super_secret_1337";

        $payload = $request->getContent();
        $calculated_hmac = base64_encode(hash_hmac('sha256', $payload, $secret, true));

        if ($signature != $calculated_hmac) {
            abort(401, 'Webhook failed signature check');
        }
    }
```