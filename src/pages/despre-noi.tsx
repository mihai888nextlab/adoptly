import Header from "@/components/header";
import Footer from "@/components/footer";
import { Playwrite_HU, Poppins } from "next/font/google";

const font = Playwrite_HU({});
const font2 = Poppins({ weight: "400", subsets: ["latin"] });

export default function About() {
  return (
    <div>
      <Header />

      <main className={font2.className + "px-8 w-[1500px] mx-auto"}>
        <div className="h-screen w-full flex justify-center">
          <div className="h-full flex flex-col justify-center mr-28 mt-14 w-1/2">
            <div className="bg-gradient-to-tl from-details to-secondary border-2 border-secondary p-4 rounded-xl">
              <h1 className="font-mono text-xl mb-8">
                Despre 
                <span className={font.className + " text-2xl font-bold"}>
                  {" "}Adoptly{" "}
                </span>
                – Împreună schimbăm vieți!
              </h1>
              <p className="text-lg text-justify mb-4">
                La Adoptly, credem că fiecare animal merită o familie iubitoare și un cămin sigur. Am creat această platformă din dorința de a facilita procesul de adopție și de a conecta persoanele care își doresc un prieten necuvântător cu adăposturile care au grijă de animale abandonate.
              </p>
            </div>
            <div className="bg-gradient-to-bl from-details to-secondary  border-2 border-secondary p-4 mt-10 mb-8 rounded-xl">
              <h1 className="font-mono text-xl mb-8">
                De ce
                <span className={font.className + " text-2xl font-bold"}>
                  {" "}Adoptly{" "}
                </span>
                ?
              </h1>
              <p className="text-lg text-justify mb-4">
              <strong>Proces Simplu & Rapid</strong> – Creezi un cont, descoperi animalele disponibile și trimiți o cerere de adopție în câțiva pași.<br/>
              <strong>Siguranță & Transparență</strong> – Colaborăm cu adăposturi de încredere pentru a asigura cele mai bune condiții pentru adopție.<br/>
              <strong>Impact Real</strong> – Fiecare adopție înseamnă o viață schimbată, atât pentru animal, cât și pentru adoptator.<br/>
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <img src="dog-about.png" alt="" className="object-contain h-[900px]"/>
          </div>
        <div className="h-full flex flex-col justify-center ml-28 w-1/2 mt-14">
          <div className="bg-gradient-to-tr from-details to-secondary border-2 border-secondary p-4 mb-8 rounded-xl">
            <h1 className="font-mono mb-8 text-xl">
            Misiunea Noastră
            </h1>
            <p className="text-lg text-justify mb-4">
            Ne dorim să simplificăm și să accelerăm procesul de adopție, oferind o experiență intuitivă, transparentă și accesibilă pentru toți iubitorii de animale. Adoptly este puntea dintre sufletele care așteaptă o familie și oamenii care sunt gata să le ofere dragostea și grija de care au nevoie.
            </p>
            </div>
            <div className="bg-gradient-to-br from-details to-secondary border-2 border-secondary p-4 mb-8 rounded-xl">
            <h1 className="font-mono mb-8 text-xl">
            Ce Facem?
            </h1>
            <p className="text-lg text-justify mb-4">
            <strong>Facilităm adopțiile </strong>– Găsește rapid și ușor un companion perfect pentru tine.<br/>
            <strong>Sprijinim adăposturile</strong> – Le oferim un spațiu digital unde își pot lista animalele disponibile pentru adopție.<br/>
            <strong>Încurajăm responsabilitatea</strong> – Informăm și educăm despre procesul de adopție, îngrijire și responsabilitatea față de un animal.<br/>
            <strong>Oferim posibilitatea de a dona</strong> – Poți susține adăposturile prin donații directe, ajutând la hrănirea și îngrijirea animalelor.
            </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
