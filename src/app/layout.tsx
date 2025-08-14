import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

// This metadata is a general fallback
export const metadata: Metadata = {
  title: "Advocate Services in Patna",
  description: "Professional legal services in Patna, Bihar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GTM_ID = "GTM-XXXXXXX"; // REPLACE WITH YOUR GTM ID

  return (
    <html lang='en'>
      <head>
        {/* Google Tag Manager Script */}
        <Script id='google-tag-manager' strategy='afterInteractive'>
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        {/* GTM Noscript Fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height='0'
            width='0'
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {/* The children will be either the (main) layout or the (admin) layout */}
        {children}

        {/* Vercel Analytics can be placed here as it's useful for the whole app */}
        <Analytics />
      </body>
    </html>
  );
}
