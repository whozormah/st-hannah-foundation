"use client";

interface PaystackButtonProps {
  name: string;
  email: string;
  phone: string;
  amount: number;
  currency: string;
  purpose: string;
}

export default function PaystackButton({
  name,
  email,
  phone,
  amount,
  currency,
  purpose,
}: PaystackButtonProps) {
  const isValid =
    name.trim().length >= 3 &&
    /\S+@\S+\.\S+/.test(email) &&
    currency &&
    purpose &&
    amount > 0;

  const handlePayment = async () => {
    if (!isValid) {
      alert("Please complete all required fields.");
      return;
    }

    try {
      const response = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          amount,
          currency,
          purpose,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.message || "Unable to initialize payment.");
        return;
      }

      window.location.href = data.authorization_url;
    } catch (error) {
      console.error(error);

      alert("Something went wrong. Please try again.");
    }
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
