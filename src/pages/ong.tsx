import Header from "@/components/header";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import { Playwrite_HU, Poppins } from "next/font/google";
import FancyButton from "@/components/fancyButton";
import Link from "next/link";
import { useRouter } from "next/router";
import { Url } from "next/dist/shared/lib/router/router";
import { User } from "@/lib/models/user";

interface Shelter {
    _id: string;  // Ensure _id is of type string
    name: string;
    description: string;
    website: string;
}

export default function ONG() {
    const [ongs, setOngs] = useState<Shelter[]>([]);

    useEffect(() => {
        fetch("/api/getShelters")
            .then(response => response.json())
            .then(data => {
                setOngs(data);
                console.log(data);
            })
            .catch(error => console.error("Error fetching NGOs:", error));
    }, []);

    return (
        <div className={`smin-h-screen flex flex-col place-self-center items-center`}>
            <Header />
            <main className="flex-grow justify-center items-center bg-center px-4 py-8">
                <h1 className="text-3xl font-bold text-center mb-6">Partenerii Noștri - ONG-uri</h1>
                <p className="text-lg text-center mb-8">
                    Susținem numeroase organizații non-guvernamentale care contribuie la o lume mai bună. Descoperă mai jos partenerii noștri.
                </p>
                <div className="grid grid-cols-1 text-center justify-center align-midle md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ongs.length > 0 ? (
                        ongs.map((ong, index) => (
                            <Link key={index} href={`/ong/${ong._id}`} passHref>
                                <div className="flex justify-center mb-8 cursor-pointer">
                                    <div className="w-full max-w-xs bg-secondary border border-transparent rounded-lg shadow-xl transform transition-transform hover:scale-105 hover:shadow-2xl p-8">
                                        <h2 className="text-3xl font-extrabold text-center text-white mb-6">{ong.name}</h2>
                                        <p className="text-center text-white opacity-80 mb-6 text-lg">
                                            {ong.description}
                                        </p>
                                        {ong.website && (
                                            <a
                                                href={ong.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block text-center text-white bg-blue-700 hover:bg-blue-800 rounded-full py-2 px-6 mt-4 transition-all duration-300 ease-in-out"
                                            >
                                                Vizitează site-ul
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 justify-center flex items-center justify-center text-xl font-semibold">
                            <span className="mr-2">Încărcăm datele...</span>
                            <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z" fill="none" stroke="currentColor" strokeWidth="4" />
                            </svg>
                        </p>
                    )}
                </div>
                <div className="text-center flex justify-center flex-col">
                    <p className="text-lg text-center mb-8">
                        Ești un ONG care dorește să devi parte din echipa de parteneri alătură-te.
                    </p>
                    <a href="/login" className="text-decoration-none">
                        <FancyButton text="Înregistrează-te" />
                    </a>
                </div>
            </main>
            <Footer />
        </div>
    );
}
