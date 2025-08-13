import { getPracticeAreas, getSiteConfig } from "../../../lib/content";
import { notFound } from "next/navigation";
import type { PracticeArea } from "../../../lib/types";
import { SeoClientComponent } from "@/components/SeoClientComponent";

export async function generateStaticParams() {
  const areas = getPracticeAreas();
  return areas.map((area: PracticeArea) => ({
    slug: area.slug,
  }));
}

export default async function PracticeAreaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const areas = getPracticeAreas();
  const area = areas.find((a: PracticeArea) => a.slug === slug);
  const config = getSiteConfig();

  if (!area) {
    notFound();
  }

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
