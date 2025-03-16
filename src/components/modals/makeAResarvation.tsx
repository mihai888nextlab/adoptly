import { useState, useRef } from "react";
import emailjs from "emailjs-com";

interface ReservationModalProps {
  petName: string;
  onClose: () => void;
}

export default function MakeAReservationModal({ petName, onClose }: ReservationModalProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendReservation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    // Basic phone number validation: change the regex if needed
    if (!/^\d{10}$/.test(formData.phone)) {
      setStatus("❌ Please enter a valid 10-digit phone number.");
      return;
    }

    emailjs
      .sendForm(
        "service_iuzw96o",   // Your EmailJS service ID
        "template_ptgh57t",   // Your EmailJS template ID
        formRef.current,
        "CMevXQW5LnhTaXrOx"   // Your EmailJS user/public key
      )
      .then((result) => {
        console.log("EmailJS result:", result);
        setStatus("✅ Reservation request sent successfully!");
        setTimeout(onClose, 2000); // Auto close modal after 2 seconds
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        setStatus("❌ Error sending reservation. Please try again.");
      });

    // Clear form fields after sending
    setFormData({ name: "", email: "", phone: "" });
  };

  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-10 rounded-xl shadow-sm w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h1 className="text-2xl font-semibold text-center">
          Make a Reservation for {petName}
        </h1>

        <form ref={formRef} className="space-y-4 mt-6" onSubmit={sendReservation}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
          >
            Submit Reservation
          </button>
        </form>

        {status && (
          <p className={`mt-4 text-center ${status.includes("Error") ? "text-red-500" : "text-green-500"}`}>
            {status}
          </p>
        )}

        <button
          className="p-3 bg-red-500 rounded-lg text-white mt-5 w-full"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
