import Stripe from "stripe";
import { STRIPE_PRIVATE_KEY } from "../config.js";
const stripe = new Stripe(STRIPE_PRIVATE_KEY);

export const charges = async (req, res) => {

    let { card_number, expiry_month, expiry_year, cvc, amount, currency_code } = req.body;

	try 
	{
		const paymentMethod = await stripe.paymentMethods.create({
			type: "card",
			card: {
				number: card_number,
				exp_month: expiry_month,
				exp_year: expiry_year,
				cvc: cvc
			},
		});

        amount = amount * 100;

		const paymentIntent = await stripe.paymentIntents.create({
			payment_method: paymentMethod.id,
			amount: amount,
			currency: currency_code,
			confirm: true,
			payment_method_types: ["card"]
		});

        const result = {
            charge_id: paymentIntent.id,
            status: paymentIntent.status,
            receipt_url: paymentIntent.charges.data[0].receipt_url
        }

        console.log(paymentIntent);
		res.send(result);
        
	} catch (err) {
        res.json({errorMessage: `${err.message}`});
        console.log("error ::", err);
	}

};
