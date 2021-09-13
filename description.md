# General

## Usage

**Important:** The API is forward-compatible. We take the freedom to add **optional** attributes to endpoints without updating the version number. In this case, you should be aware that a PUT request replaces an entire object. i.e. not specifying a field on an object will **null** the field. To update a single field on e.g. a product you must first GET the product and then PUT the entire product with the new updated field. See example below.

## Auth

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

# Examples

## PHP

### Update the stock of a product

```php
<?php
class ServicePOSException extends Exception
{
	public $err;
	public function __construct($error)
	{
		$this->err = $error;
		parent::__construct($error['message']);
	}
}

class ServicePOS
{
	private $token = null;

	function __construct($token)
	{
		$this->token = $token;
	}

	function call($method, $endpoint, $data = false)
	{
		$url = 'https://app.deltateq.com/api' . $endpoint;
		$curl = curl_init();
		switch ($method) {
			case "POST":
				curl_setopt($curl, CURLOPT_POST, 1);
				if ($data) {
					curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));
				}
				break;
			case "PUT":
				curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'PUT');
				if ($data) {
					curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));
				}
				break;
			default:
				if ($data) {
					$url = sprintf("%s?%s", $url, http_build_query($data));
				}
		}
		curl_setopt($curl, CURLOPT_HTTPHEADER, array(
			'Accept: application/json',
			'Content-Type: application/json',
			'Authorization: Bearer ' . $this->token,
		));
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		$result = curl_exec($curl);
		$status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
		if ($status >= 300) {
			throw new ServicePOSException([
				'endpoint' => $url,
				'status' => $status,
				'error' => $this,
				'method' => 'post',
				'message' => 'Service API',
				'result' => $result
			]);
		}
		curl_close($curl);
		return json_decode($result, true);
	}
}


try {
    $servicepos = new ServicePOS('<token>');

    /* increase stock,
     * If you do not specify the cost price, we use the current average stock price */
    $transaction = [
        'productid' => '<id>',
        'addtostock' => 5,
        'costpriceofaddeditems' => 100,
    ];
    $servicepos->call('POST', '/stocktransactions', ['content' => $transaction]);

    /* decrease stock, costpriceofaddeditems must not be specified */
    $transaction = [
        'productid' => '<id>',
        'addtostock' => -2,
    ];
    $servicepos->call('POST', '/stocktransactions', ['content' => $transaction]);

    /* update a product */
    $product = $servicepos->call('GET', '/products/<id>')['content'];
    $product['title'] = 'New title';
    $product = $servicepos->call('PUT', '/products/<id>', ['content' => $product]);
} catch(Exception $e) {
    echo($e->err['result']);
}
```

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
product.created
product.updated
product.deleted
supplier.updated
supplier.deleted
supplier.created
pospayment.created
posbalance.created
customer.created
customer.updated
customer.deleted
shoppinglistorder.created
shoppinglistorder.deleted
shoppinglistitem.created
shoppinglistitem.updated
shoppinglistitem.deleted
customertags.created
customertags.updated
customertags.deleted
customerarticle.created
customerarticle.updated
customerarticle.deleted
taskmaterial.created
taskmaterial.updated
taskmaterial.deleted
task.created
task.updated
task.deleted
taskcomment.created
taskcomment.updated
taskcomment.deleted
stocktransaction.committed
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
