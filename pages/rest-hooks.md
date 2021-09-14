# REST Hooks

The ServicePOS API supports [REST Hooks](http://resthooks.org/). This allows you to subscribe to events in our system and get notified via a callback url immediately.

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

If the request returns **408** (Request Timeout), **429** (Too Many Requests) or **5xx** (Server Error) the server will **retry every 10th minute.**

## Suppress Hooks

When using the API to make changes to your store, for instance create products, these interactions will trigger events like `product.created` just like using the app would.

In some cases this behaviour is not desired since it can create infinite loops between services, for instance stock sync between ServicePOS and e-conomic.

To avoid this, interact with the API with the following header
`X-Suppress-Hooks:`
The content of the header doesn't matter and is ignored.
