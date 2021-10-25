## Create a payment

```CLI
POST //api/pospayments HTTP/1.1
Content-Type: application/json
Authorization: Bearer <apitoken>
Host: app.deltateq.com
Content-Length: 250

{
	"articles": [
		{
			"title": "Vin",
			"price": 100,
			"costprice": 30,
			"quantity": 1,
			"productno": "zinfandel_123",
			"vat": 25
		}
	],
	"paymenttypes": [
		{
			"title": "Cash",
			"amount": 100,
			"cash": 1
		}
	],
	"userid": 0
}
```


