import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
// Import from the new server-only file
import { getSiteConfig } from "@/lib/content-server";
import { Background } from "@/components/common/Background";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "@/context/AuthContext";
import { LoginModal } from "@/components/auth/LoginModal";
import Script from "next/script";
import { DisclaimerPopup } from "@/components/DisclaimerPopup"; // NEW IMPORT

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const config = getSiteConfig();
  return {
    title: {
      default: config.seo.title,
      template: `%s | ${config.advocateName}`,
    },
    description: config.seo.description,
    keywords: config.seo.keywords,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteConfig = getSiteConfig();
  const GTM_ID = "GTM-XXXXXXX"; // REPLACE WITH YOUR GTM ID

  return (
    <html lang='en'>
      <head>
        {" "}
        {/* ADD THIS head TAG */}
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
        <noscript>
          {" "}
          {/* ADD THIS noscript TAG */}
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height='0'
            width='0'
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <AuthProvider>
          <div className='relative flex flex-col min-h-screen'>
            <Background />
            {/* Pass the fetched data as props */}
            <Header advocateName={siteConfig.advocateName} />
            <main className='flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-10 z-10'>
              <Breadcrumb />
              {children}
            </main>
            {/* Pass the fetched data as props */}
            <Footer siteConfig={siteConfig} />
          </div>
          <LoginModal />
          <DisclaimerPopup />
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  );
}
