import { Playwrite_HU } from "next/font/google";
import Link from "next/link";

const font = Playwrite_HU({});

const menu = [
  {
    name: "Acasa",
    link: "/",
  },
  {
    name: "ONG",
    link: "/ong",
  },
  {
    name: "Despre noi",
    link: "/despre-noi",
  },
  {
    name: "Adopta",
    link: "/adopta",
  },
  {
    name: "Doneaza",
    link: "/doneaza",
  },
  {
    name: "Evenimente",
    link: "/evenimente",
  },
  {
    name: "AI",
    link: "/ai",
  },
  {
    name: "Contact",
    link: "/contact",
  },
];

export default function Header() {
  return (
    <header className="fixed top-0 absolute left-0 right-0 z-10 border-b-2 flex items-center justify-center">
      <nav className="h-[75px] w-[1500px] bg-white flex items-center justify-between px-8">
        <div className="h-full flex items-center cursor-pointer">
          <img src="logo.png" alt="" className="h-full" />
          <h1 className={font.className + " text-2xl"}>Adoptly</h1>
        </div>
        <div>
          {menu.map((item) => (
            <Link href={item.link} key={item.name} className="mx-3 text-lg">
              <span className="font-mono hover:underline hover:text-secondary">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
