import { AuthProvider } from "@/context/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getSiteConfig } from "@/lib/content-server";
import { Background } from "@/components/common/Background";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { LoginModal } from "@/components/auth/LoginModal";
import { DisclaimerPopup } from "@/components/DisclaimerPopup";
import type { Metadata } from "next";
// import { Inter } from "next/font/google"; // Import Inter font if you want to apply it here, though root is fine

// const inter = Inter({ subsets: ["latin"] }); // This is optional if already in root

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

export default function MainAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteConfig = getSiteConfig();

  // --- CORRECTED: AuthProvider and related components are RESTORED here ---
  return (
    <AuthProvider>
      <div className='relative flex flex-col min-h-screen'>
        <Background />
        <Header advocateName={siteConfig.advocateName} />
        <main className='flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-10 z-10'>
          <Breadcrumb />
          {children}
        </main>
        <Footer siteConfig={siteConfig} />
      </div>
      {/* Global modals for the main site are placed here */}
      <LoginModal />
      <DisclaimerPopup />
    </AuthProvider>
  );
}
