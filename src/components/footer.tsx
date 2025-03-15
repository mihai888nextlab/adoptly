import { Playwrite_HU } from "next/font/google";
import Link from "next/link";

const font = Playwrite_HU({});

const menu = [
    {
      name: "Acasa",
      link: "/",
    },
    {
      name: "Despre noi",
      link: "/despre-noi",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];
  

export default function Footer() {
  return (
    <footer className="h-[300px] z-20 flex flex-col border-t-2">
          <div className="flex items-center justify-center mt-2 mt-20">
            {menu.map((item) => (
                <Link href={item.link} key={item.name} className="mx-3 text-xl">
                <span className="font-mono hover:underline hover:text-secondary">
                    {item.name}
                </span>
                </Link>

            ))}
          </div>

          <div className="flex items-center justify-center my-20">
            <p className="text-2xl font-semibold text-background">© 2025 <span className={font.className}>Adoptly</span>. All rights reserved</p>
          </div>
    </footer>
  );
}
