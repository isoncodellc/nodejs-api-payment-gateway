import conekta from "conekta";
import { CONEKTA_PRIVATE_KEY } from "../config.js";

conekta.api_key = CONEKTA_PRIVATE_KEY;
conekta.api_version = "2.0.0";

export const createOrder = async (req, res) => {

	try 
	{
		let customer = await conekta.Customer.create({
			name: "Payment Link Name",
			email: "test@test.com"
		});

		customer = customer.toObject();

		const orderCreated = await conekta.Order.create({
			"currency": "MXN",
			"customer_info": {
				"customer_id": customer.id
			},
			"line_items": [{
				"name": "BookingId #100001",
				"unit_price": 3000,
				"quantity": 1
			}],
			"checkout": {
				"type":"HostedPayment",
				"success_url": "http://testredirect.com/success",
				"failure_url": "http://testredirect.com/fail",
				"allowed_payment_methods": ["card"],
				"multifactor_authentication": false,
				"redirection_time": 4,
			}
		});

		const result = {
			checkout_id: orderCreated._json.checkout.id,
			order_id: orderCreated._json.id,
			redirect_url: orderCreated._json.checkout.url
		};

		console.log("result ::", result);

		res.json(result);

	} catch (error) {
		console.log("error ::", error);
		res.send(error);
	}

};
