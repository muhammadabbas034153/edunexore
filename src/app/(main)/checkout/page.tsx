import Image from 'next/image';
import { CheckoutForm } from '@/components/forms/checkout-form';

export default function CheckoutPage() {
  return (
    <div className="container py-16">
      <h1 className="text-3xl font-bold text-center mb-8">Complete Your Order</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-slate-50 p-8 rounded-2xl border">
          <h2 className="text-xl font-semibold mb-4">Step 1: Make Payment</h2>
          <p className="text-slate-600 mb-4">
            Please transfer the total amount to the EasyPaisa account below.
          </p>
          <div className="flex flex-col items-center">
            <Image
              src="/payments/easypaisa-qr.png"
              alt="EasyPaisa QR Code for Muhammad Abbas"
              width={250}
              height={250}
              className="rounded-lg border p-1"
            />
            <a 
              href="/payments/easypaisa-qr.png" 
              download 
              className="text-sm text-sky-600 hover:underline mt-2"
            >
              Download QR Code
            </a>
          </div>
          <div className="mt-6 text-center">
            <p className="font-semibold">Account Title: <span className="font-mono">Muhammad Abbas</span></p>
            <p className="font-semibold">Account Number: <span className="font-mono">0341 5358054</span></p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border">
          <h2 className="text-xl font-semibold mb-4">Step 2: Confirm Your Order</h2>
          <p className="text-slate-600 mb-6">
            After payment, fill out the form and upload your payment receipt. We will confirm your order via email shortly.
          </p>
          {/* A server component can't host a client form directly. So we wrap it. */}
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
}