import { getPracticeAreas, getSiteConfig } from "../../../lib/content";
import { notFound } from "next/navigation";
import type { PracticeArea } from "../../../lib/types";
import { SeoClientComponent } from "@/components/SeoClientComponent";

// This function tells Next.js which pages to pre-build at build time (SSG)
// This is excellent for SEO and performance.
export async function generateStaticParams() {
  const areas = getPracticeAreas();
  return areas.map((area: PracticeArea) => ({
    slug: area.slug,
  }));
}

export default function PracticeAreaDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const areas = getPracticeAreas();
  const area = areas.find((a: PracticeArea) => a.slug === params.slug);
  const config = getSiteConfig();

  if (!area) {
    notFound();
  }

  // Prepare SEO data on the server
  const seo = {
    title: `${area.title} Lawyer in Patna`,
    description: area.summary,
    schema: {
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
      },
      areaServed: {
        "@type": "City",
        name: "Patna",
      },
    },
  };

  return (
    <>
      <SeoClientComponent
        title={seo.title}
        description={seo.description}
        schema={seo.schema}
      />

      <div className='p-8 md:p-12 bg-card rounded-xl border border-border shadow-sm'>
        <h1 className='text-4xl font-extrabold mb-6'>{area.title}</h1>
        <div className='prose prose-lg max-w-none text-foreground leading-relaxed'>
          <p>{area.detailedDescription}</p>
        </div>
      </div>
    </>
  );
}
