'use client';


import { Elements } from '@stripe/react-stripe-js';
import convertToSubcurrency from '@/app/lib/convertToSubcurrency';
import CheckoutPage from '@/components/Checkout/CheckoutPage';
import { loadStripe } from '@stripe/stripe-js';
import HeaderOne from "@/components/Header/HeaderOne";
import { useSearchParams } from 'next/navigation';


const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);


const Payment = () => {

  const params = useSearchParams();

  const totalAmount = params.get('amount');
  const payAmount = totalAmount ? parseInt(totalAmount) : 0;

  const options = {
    mode: 'payment' as 'payment', // Explicitly type 'payment' as the string literal
    amount: payAmount,
    currency: 'eur',
  };

  return (
    <div>
      <HeaderOne />
      <div>
        Make Payment for the reservation
      </div>

      <Elements stripe={stripePromise} options={options}>
        <CheckoutPage amount={payAmount} />
      </Elements>

    </div>
  );
}

export default Payment;