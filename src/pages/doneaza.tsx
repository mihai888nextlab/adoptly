import Button from "@/components/fancyButton";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Link from "next/link";
import { useState } from "react";


export default function Doneaza() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs: Check if they contain only numbers
    if (!/^\d+$/.test(cardNumber)) {
      setError("Card Number must contain only numbers");
      return;
    }
    if (!/^\d+$/.test(cvv)) {
      setError("CVV must contain only numbers");
      return;
    }
    if (!/^\d+$/.test(expiryDate)) {
      setError("Expiry date must contain only numbers");
      return;
    }
    if (!/\//.test(expiryDate)) {
      setError("Expiry date must contain '/'");
      return;
    }

    // If all validations pass, proceed
    setError("");
    alert("Donation submitted!");
  };

  return (
    <main>
      <Header />

      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-1/2 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Donate Now</h2>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="cardNumber" className="block font-medium mb-1">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5678 9876 5432"
                required
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <label htmlFor="expiryDate" className="block font-medium mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  placeholder="MM/YY"
                  required
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="w-1/2">
                <label htmlFor="cvv" className="block font-medium mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  required
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="amount" className="block font-medium mb-1">
                Donation Amount ($)
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                required
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Donate
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
}
