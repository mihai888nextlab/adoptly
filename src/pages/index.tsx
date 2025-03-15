import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";
import { Playwrite_HU, Poppins } from "next/font/google";

const font = Playwrite_HU({});
const font2 = Poppins({ weight: "400", subsets: ["latin"] });

export default function Index() {
  return (
    <div>
      <Header />

      <main className={font2.className + "px-8 w-[1500px] mx-auto"}>
        <div className="h-screen w-full flex justify-between">
          <div className="h-full flex flex-col justify-center mr-28 w-1/2">
            <h1 className="font-mono mb-12">
              Bine ai venit la{" "}
              <span className={font.className + " text-2xl font-bold"}>
                Adoptly
              </span>
            </h1>
            <p className="text-lg text-justify mb-14">
              Adoptly este locul unde sufletele își găsesc familia potrivită,
              iar fiecare adopție devine o poveste emoționantă de iubire și
              speranță. Aici vei descoperi o varietate de animale adorabile, de
              toate vârstele și rasele, care își doresc un cămin călduros și un
              stăpân iubitor. Platforma noastră îți oferă o experiență simplă,
              intuitivă și accesibilă, astfel încât să poți găsi rapid
              companionul perfect pentru tine și familia ta. <br /> <br />
              Indiferent dacă visezi la un cățeluș jucăuș sau o pisicuță blândă,
              Adoptly îți pune la dispoziție toate informațiile de care ai
              nevoie pentru a face alegerea potrivită. Mai mult decât atât, dacă
              vrei să susții adăposturile de animale și să contribui la
              îngrijirea lor, poți face donații direct prin platformă,
              oferindu-le o șansă în plus la o viață mai bună.
            </p>

            <div className="flex">
              <Link href="/adopta" className="bg-secondary text-white px-4 py-2 rounded-2xl mr-4 w-1/2 h-12 font-semibold text-lg flex justify-center items-center">
                Adoptă
              </Link>
              <Link href="/doneaza" className="bg-primary text-white px-4 py-2 rounded-2xl w-1/2 h-12 font-semibold text-lg flex justify-center items-center">
                Donează
              </Link>
            </div>
          </div>
          <div className="h-full w-1/2 flex flex-col justify-center">
            <img src="bg.png" alt="" className="w-[500px] rounded-xl" />
            <img
              src="bg2.png"
              alt=""
              className="self-end w-[400px] rounded-xl relative -top-16"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
