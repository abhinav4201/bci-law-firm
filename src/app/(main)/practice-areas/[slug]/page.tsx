import { getPracticeAreas, getSiteConfig } from "../../../../lib/content-server";
import { notFound } from "next/navigation";
import type { PracticeArea } from "../../../../lib/types";
import type { Metadata } from "next";

// This function finds the data for a given slug
async function getArea(slug: string) {
  const areas = getPracticeAreas();
  return areas.find((a: PracticeArea) => a.slug === slug);
}

// This is the new, server-side function to generate SEO metadata
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const area = await getArea(params.slug);
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
    },
    areaServed: {
      "@type": "City",
      name: "Patna",
    },
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
  params: { slug: string };
}) {
  const area = await getArea(params.slug);

  if (!area) {
    notFound();
  }

  return (
    <div className='p-8 md:p-12 bg-card rounded-xl border border-border shadow-sm'>
      <h1 className='text-4xl font-extrabold mb-6'>{area.title}</h1>
      <div className='prose prose-lg max-w-none text-foreground leading-relaxed'>
        <p>{area.detailedDescription}</p>
      </div>
    </div>
  );
}
