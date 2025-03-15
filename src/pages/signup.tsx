import Header from "@/components/header";
import { Poppins } from "next/font/google";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import Loading from "@/components/loading";
import emailjs from "emailjs-com";

const font2 = Poppins({ weight: "400", subsets: ["latin"] });

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const signupFormAction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    //const ongCode = formData.get("ongCode") as string;

    if (!name || !email || !password || !confirmPassword) {
      setError("Toate câmpurile sunt obligatorii.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Parolele nu coincid.");
      return;
    }

    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      setError(
        "Parola trebuie să aibă minim 8 caractere, o literă mare și un număr."
      );
      return;
    }

    // if (!/^[1-9]{4}\/[UFA]\/[1-9]{4}$/.test(ongCode)) {
    //   setError("Codul ONG trebuie să fie în formatul XXXX/Y/XXXX, unde X este între 1-9, iar Y este U, F sau A.");
    //   return;
    // }

    setLoading(true);
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    setLoading(false);

    if (response.ok) {
      sendConfirmationEmail(email);
      router.push("/dashboard");
    } else {
      setError(data.message);
    }
};


  const sendConfirmationEmail = (email: string) => {
    emailjs
      .send(
        "service_xxx", // Replace with your EmailJS service ID
        "template_xxx", // Replace with your EmailJS template ID
        { to_email: email },
        "user_xxx" // Replace with your EmailJS user ID
      )
      .then(() => {
        alert("Email de confirmare trimis!");
      })
      .catch(() => {
        alert("Eroare la trimiterea emailului de confirmare.");
      });
  };

  return (
    <div>
      <Header />
      {loading && <Loading />}

      <main
        className={
          font2.className +
          " px-8 w-[1500px] mx-auto flex justify-center items-center h-screen"
        }
      >
        <div className="w-1/3 bg-white p-10 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-6">
            Creează un cont
          </h1>

          <form className="space-y-6" onSubmit={signupFormAction}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-900"
              >
                Nume
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="block w-full rounded-md border-2 px-3 py-2 text-base text-gray-900 outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Adresa de email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="block w-full rounded-md border-2 px-3 py-2 text-base text-gray-900 outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Parolă
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                className="block w-full rounded-md border-2 px-3 py-2 text-base text-gray-900 outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-900"
              >
                Confirmă Parola
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                required
                className="block w-full rounded-md border-2 px-3 py-2 text-base text-gray-900 outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            {/* <div>
              <label
                htmlFor="ongCode"
                className="block text-sm font-medium text-gray-900"
              >
                Cod ONG
              </label>
              <input
                type="text"
                name="ongCode"
                id="ongCode"
                required
                className="block w-full rounded-md border-2 px-3 py-2 text-base text-gray-900 outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div> */}

            {error && (
              <p className="text-red-500 mt-4 font-semibold">{error}</p>
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-lg font-semibold text-white shadow-md hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-400"
              >
                Sign Up
              </button>
              <p className="text-gray-700 mt-4 text-center">
                Ai deja un cont?{" "}
                <a className="text-blue-500 hover:underline" href="/login">
                  Log in
                </a>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
