import { useState, useRef } from "react";
import emailjs from "emailjs-com";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Contact() {
    const formRef = useRef<HTMLFormElement>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [status, setStatus] = useState<string | null>(null);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Send email
    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formRef.current) return;

        emailjs
            .sendForm(
                "service_iuzw96o",  
                "template_ptgh57t",  
                formRef.current, 
                "CMevXQW5LnhTaXrOx"       
            )
            .then(
                () => setStatus("✅ Email sent successfully!"),
                () => setStatus("❌ Error sending email. Please try again.")
            );

        // Reset form after sending
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <Header />
            <section className="max-w-lg w-full p-6 bg-white rounded-md shadow-lg mt-6">
                <h1 className="text-2xl font-semibold text-gray-800 text-center">Contact Us</h1>
                <form ref={formRef} className="space-y-4 mt-6" onSubmit={sendEmail}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
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
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
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
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
                    >
                        Send Message
                    </button>
                </form>
                {status && (
                    <p className={`mt-4 text-center ${status.includes("Error") ? "text-red-500" : "text-green-500"}`}>
                        {status}
                    </p>
                )}
            </section>
            <Footer />
        </main>
    );
}
