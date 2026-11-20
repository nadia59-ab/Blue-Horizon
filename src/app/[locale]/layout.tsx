import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { manrope } from "../fonts";
import SiteClosing from "@/components/site-closing";
import { SmoothScrollProvider } from "@/components/motion";
import "../globals.css";

export const metadata: Metadata = {
  title: "Blue Horizon Hotel & Beach | Hurghada, Egypt",
  description: "Project scaffold for Blue Horizon Hotel & Beach in Hurghada, Egypt.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={manrope.variable}>
        <NextIntlClientProvider messages={messages}>
          <SmoothScrollProvider>
            {children}
            <SiteClosing />
          </SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
