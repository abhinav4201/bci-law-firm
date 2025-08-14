import {
  getPracticeAreas,
  getSiteConfig,
} from "../../../../lib/content-server";
import { notFound } from "next/navigation";
import type { PracticeArea } from "../../../../lib/types";
import type { Metadata } from "next";
import { HelpCircle } from "lucide-react"; // NEW IMPORT

// This function finds the data for a given slug
async function getArea(slug: string) {
  const areas = getPracticeAreas();
  return areas.find((a: PracticeArea) => a.slug === slug);
}

// This is the new, server-side function to generate SEO metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = await getArea(slug);
  const config = getSiteConfig();

  if (!area) {
    return {
      title: "Not Found",
    };
  }

  const seo = {
    title: `${area.title} Lawyer in Patna`,
    description: area.summary,
  };

  // This is the JSON-LD schema for rich results in Google
  const schema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: `${area.title} Services`,
    description: area.detailedDescription,
    provider: {
      "@type": "Attorney",
      name: config.advocateName,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Patna",
        addressRegion: "Bihar",
      },
      telephone: config.contact.phone, // ADD THIS
      email: config.contact.email, // ADD THIS
    },
    areaServed: {
      "@type": "City",
      name: "Patna",
    },
    serviceType: area.title,
  };

  return {
    title: seo.title,
    description: seo.description,
    // The correct way to add JSON-LD schema in the App Router
    other: {
      "application/ld+json": JSON.stringify(schema),
    },
  };
}

// This generates the list of pages to be built
export async function generateStaticParams() {
  const areas = getPracticeAreas();
  return areas.map((area: PracticeArea) => ({
    slug: area.slug,
  }));
}

// The page component is now much simpler
export default async function PracticeAreaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = await getArea(slug);

  if (!area) {
    notFound();
  }

  return (
    <div>
      <div className='p-8 md:p-12 bg-card rounded-xl border border-border shadow-sm'>
        <h1 className='text-4xl font-extrabold mb-6'>{area.title}</h1>
        <div className='prose prose-lg max-w-none text-foreground leading-relaxed'>
          <p>{area.detailedDescription}</p>
        </div>
      </div>

      {/* --- NEW FAQ SECTION --- */}
      {area.faqs && area.faqs.length > 0 && (
        <div className='mt-12'>
          <h2 className='text-3xl font-bold mb-8 text-center flex items-center justify-center'>
            <HelpCircle className='mr-3 h-8 w-8 text-brand-accent' />
            Frequently Asked Questions
          </h2>
          <div className='space-y-6 max-w-4xl mx-auto'>
            {area.faqs.map((faq, index) => (
              <div
                key={index}
                className='bg-card p-6 rounded-lg border border-border'
              >
                <h3 className='font-semibold text-lg text-brand-primary'>
                  {faq.question}
                </h3>
                <p className='mt-2 text-muted'>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* --- END FAQ SECTION --- */}
    </div>
  );
}
