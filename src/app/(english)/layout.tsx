import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { manrope } from "../fonts";
import SiteClosing from "@/components/site-closing";
import { SmoothScrollProvider } from "@/components/motion";
import "../globals.css";

export const metadata: Metadata = {
  title: "Blue Horizon Hotel & Beach | Hurghada, Egypt",
  description: "Project scaffold for Blue Horizon Hotel & Beach in Hurghada, Egypt.",
};

export default async function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  setRequestLocale("en");
  const messages = await getMessages();

  return (
    <html lang="en">
      <body className={manrope.variable}>
        <NextIntlClientProvider locale="en" messages={messages}>
          <SmoothScrollProvider>
            {children}
            <SiteClosing />
          </SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
