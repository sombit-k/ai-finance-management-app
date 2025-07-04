import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
});


export const metadata = {
  title: "MoneyMinds AI",
  description: "AI-driven smart finance management tool",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>

      <html lang="en">
        <body
          className={`${notoSans.variable} antialiased`}
        >
          {/* Header */}
          <Header />

          <main className="min-h-screen  text-black">
            {children}
          </main>


          {/* Footer */}

          <footer className="bg-blue2-500 text-white py-4 text-center">
            <div className="container mx-auto">
              <p className="text-sm">
                &copy; {new Date().getFullYear()} MoneyMinds AI. All rights reserved.
              </p>
              <p className="text-xs mt-2">
                Made with ❤️ by the MoneyMinds AI Team (Sombit Karmakar)
              </p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
