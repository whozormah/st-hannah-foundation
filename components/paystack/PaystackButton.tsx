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
  const isValid =
    name.trim().length >= 3 &&
    /\S+@\S+\.\S+/.test(email) &&
    currency &&
    amount > 0;

  const handlePayment = () => {
    if (!name.trim()) {
      alert("Please enter your full name.");
      return;
    }

    if (name.trim().length < 3) {
      alert("Full name must be at least 3 characters.");
      return;
    }

    if (!email.trim()) {
      alert("Please enter your email address.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!currency) {
      alert("Please choose your currency.");
      return;
    }

    if (!amount || amount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

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
      disabled={!isValid}
      className={`w-full py-5 rounded-xl font-semibold text-lg transition ${
        isValid
          ? "bg-[#844204] hover:bg-[#6d3503] text-white"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }`}
    >
      Complete Your Donation
    </button>
  );
}
