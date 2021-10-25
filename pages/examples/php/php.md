## PHP: Update the stock of a product

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
