'use client';

import Footer from '@/components/Footer/Footer';
import HeaderOne from '@/components/Header/HeaderOne';
import { useSearchParams, useRouter } from 'next/navigation';

export default function PaymentSuccess() {
  const params = useSearchParams();
  const amount = params.get('amount');
  const id = params.get('id');
  const router = useRouter();

  const handleReservation = () => {
    router.push(`/reservation?id=${id!}`);
  };

  return (
    <>
      <HeaderOne />

      <main className='w-[95%] mx-auto sm:w-[90%] max-w-4xl bg-surface p-6 rounded-md my-12'>
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-2">
            Thank you for your reservation!
          </h1>
          <h2 className="text-2xl">
            We`re thrilled to have you experience our camping site.
          </h2>

          <div className="mt-5 text-4xl font-bold">
            ${amount}
          </div>

          <p className="text-lg mt-8">
            Your payment has been successfully processed. We look
            forward to welcoming you soon! Get ready to unwind,
            connect with nature, and create unforgettable memories
            under the stars.
          </p>
          <button
            type="button"
            onClick={handleReservation}
            className="button-main bg-primary w-full text-center mt-5"
          >
            Continue to Reservation
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}
