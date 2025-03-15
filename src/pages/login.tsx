import Header from "@/components/header";
import { Playwrite_HU, Poppins } from "next/font/google";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import Loading from "@/components/loading";

const font2 = Poppins({ weight: "400", subsets: ["latin"] });

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const loginFormACtion = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (email == "" || password == "") {
      setError("Emailul sau parola sunt invalide.");
      return;
    }

    setLoading(true);
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    setLoading(false);

    if (response.ok) {
      router.push("/dashboard"); // Redirecționare după login
    } else {
      setError(data.message);
    }
  };

  return (
    <div>
      <Header />

      {loading && <Loading />}

      <main
        className={
          font2.className +
          "px-8 w-[1500px] mx-auto flex justify-center items-center h-screen"
        }
      >
        <div className="w-1/3">
          <h1>Intra in contul tau</h1>

          <form className="space-y-6" onSubmit={loginFormACtion}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-2 bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-2 bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>

              {error && (
                <p className="text-red-500 mt-4 font-semibold">{error}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log in
              </button>
              <p className="text-black-500 mt-4 text-center font-semib">You don't have an account <a className="text-blue-500 hover:underline" href="/signup">SignUp</a></p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
