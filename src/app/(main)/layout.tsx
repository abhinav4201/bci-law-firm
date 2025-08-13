import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
// Import from the new server-only file
import { getSiteConfig } from "@/lib/content-server";
import { Background } from "@/components/common/Background";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "@/context/AuthContext";
import { LoginModal } from "@/components/auth/LoginModal";

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

  return (
    <html lang='en'>
      <body className={inter.className}>
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
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  );
}
