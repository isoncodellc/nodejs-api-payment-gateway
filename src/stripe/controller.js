import Stripe from "stripe";
import { STRIPE_PRIVATE_KEY } from "../config.js";
const stripe = new Stripe(STRIPE_PRIVATE_KEY);

export const charges = async (req, res) => {

	try 
	{
		const paymentMethod = await stripe.paymentMethods.create({
			type: "card",
			card: {
				number: "4242424242424249",
				exp_month: 11,
				exp_year: 2024,
				cvc: "123",
			},
		});

		const paymentIntent = await stripe.paymentIntents.create({
			payment_method: paymentMethod.id,
			amount: 1000,
			currency: "USD",
			confirm: true,
			payment_method_types: ["card"]
		});

		res.send(paymentIntent);
        
	} catch (error) {
		res.json({errorMessage: `${error.message}`});
	}

};

export const refund = async (req, res) => {

	const { chargeId } = req.body;

	try 
	{
		const refund = await stripe.refunds.create({
			charge: chargeId
		});
    
		res.send(refund);
        
	} catch (error) {
		res.json({errorMessage: `${error.message}`});
	}
	
};