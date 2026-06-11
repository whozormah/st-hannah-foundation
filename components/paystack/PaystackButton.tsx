"use client";

interface PaystackButtonProps {
  name: string;
  email: string;
  amount: number;
  currency: string;
}

export default function PaystackButton({
  name,
  email,
  amount,
  currency,
}: PaystackButtonProps) {
  const handlePayment = () => {
    alert(
      "Paystack integration will be activated once the public key is added.",
    );

    console.log({
      name,
      email,
      amount,
      currency,
    });
  };

  return (
    <button
      type="button"
      onClick={handlePayment}
      className="w-full bg-[#844204] hover:bg-[#6d3503] transition text-white py-5 rounded-xl font-semibold text-lg"
    >
      Support A Cause
    </button>
  );
}
