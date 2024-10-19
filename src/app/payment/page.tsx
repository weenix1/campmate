'use client';


import { Elements } from '@stripe/react-stripe-js';
import convertToSubcurrency from '@/app/lib/convertToSubcurrency';
import CheckoutPage from '@/components/Checkout/CheckoutPage';
import { loadStripe } from '@stripe/stripe-js';
import HeaderOne from "@/components/Header/HeaderOne";
import { useSearchParams } from 'next/navigation';
import Footer from '@/components/Footer/Footer';


const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);


const Payment = () => {

  const params = useSearchParams();

  const totalAmount = params.get('amount');
  const id = params.get('id')
  const payAmount = totalAmount ? parseInt(totalAmount) : 0;

  const options = {
    mode: 'payment' as 'payment', // Explicitly type 'payment' as the string literal
    amount: payAmount,
    currency: 'eur',
  };

  return (
    <div>
      <HeaderOne />
     <div className='w-[95%] mx-auto sm:w-[90%] max-w-4xl bg-surface p-6 rounded-md my-12'>
    <div className="heading5 my-4">
        Make Payment for the reservation
      </div>

      <Elements stripe={stripePromise} options={options}>
        <CheckoutPage amount={payAmount} id={id!} />
      </Elements>
      </div>
<Footer />
    </div>
  );
}

export default Payment;