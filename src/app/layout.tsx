import type { Metadata } from "next";
import { Nunito, Space_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/context/AuthContext";
import { AppDataProvider } from "@/lib/context/AppDataContext";
import { SeasonProvider } from "@/lib/context/SeasonContext";
import { SettingsProvider } from "@/lib/context/SettingsContext";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Streak Up — Gentle Productivity & Habit Tracker",
  description: "Membangun kebiasaan baik dengan cara yang emosional, hangat, dan penuh pencapaian.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${nunito.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                document.documentElement.classList.remove('dark');
                localStorage.removeItem('streakup_theme');
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-surface font-body-md text-on-surface transition-all duration-500 ease-in-out">
        <SettingsProvider>
          <SeasonProvider>
            <AuthProvider>
              <AppDataProvider>
                {children}
              </AppDataProvider>
            </AuthProvider>
          </SeasonProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
