import { Seymour_One, Montserrat_Alternates } from "next/font/google";

import "./globals.css";

const seymourOne = Seymour_One({
  subsets: ["latin"],
  variable: "--font-seymour",
  display: "swap",
  weight: ["400"],
});

const montserratAlternates = Montserrat_Alternates({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata = {
    title: "Projeto Order Tech",
    description: "Projeto pra mostrar tudo que eu sei",
    icons: {
        icon: "/icons/favicon.ico",
    },
};

export default function RootLayout({ children }) {
    return (
        <html className={`${seymourOne.variable} ${montserratAlternates.variable}`}>
            <body cz-shortcut-listen="true">
                <main>{children}</main>
            </body>
        </html>
    );
}
