import { getProfile, getSiteConfig } from "../../lib/content-server";
import { Award, GraduationCap } from "lucide-react";
import type { Metadata } from "next";

// This function generates all SEO metadata on the server.
export async function generateMetadata(): Promise<Metadata> {
  const profile = getProfile();
  const config = getSiteConfig();

  const seo = {
    title: `Profile of ${profile.name}`,
    description: `Learn about the professional background, qualifications, and memberships of ${profile.name}, an advocate in Patna.`,
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Attorney",
    name: profile.name,
    description: profile.biography.substring(0, 160),
    address: {
      "@type": "PostalAddress",
      streetAddress: config.contact.address,
      addressLocality: "Patna",
      addressRegion: "Bihar",
      postalCode: "800001",
      addressCountry: "IN",
    },
    telephone: config.contact.phone,
    email: config.contact.email,
    url: `https://[yourdomain].com/profile`, // Replace with your actual domain later
  };

  return {
    title: seo.title,
    description: seo.description,
    other: {
      // This is the correct way to add JSON-LD schema
      "application/ld+json": JSON.stringify(schema),
    },
  };
}

export default function ProfilePage() {
  const profile = getProfile();

  return (
    <div className='p-8 md:p-12 bg-card rounded-xl border border-border shadow-sm'>
      <h1 className='text-4xl font-extrabold text-center mb-4'>
        {profile.name}
      </h1>
      <p className='text-center text-lg text-muted-foreground mb-10'>
        Enrollment No: {profile.enrollmentNumber} | Practicing Since:{" "}
        {profile.practiceSince}
      </p>

      <div className='prose prose-lg max-w-none mx-auto text-foreground leading-relaxed'>
        <p>{profile.biography}</p>
      </div>

      <div className='mt-12 grid md:grid-cols-2 gap-10'>
        <div>
          <h2 className='text-2xl font-bold mb-4 flex items-center'>
            <GraduationCap className='mr-3 h-7 w-7 text-brand-accent' />{" "}
            Qualifications
          </h2>
          <ul className='list-disc list-inside space-y-2 text-lg'>
            {profile.qualifications.map((q: string, i: number) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className='text-2xl font-bold mb-4 flex items-center'>
            <Award className='mr-3 h-7 w-7 text-brand-accent' /> Professional
            Memberships
          </h2>
          <ul className='list-disc list-inside space-y-2 text-lg'>
            {profile.professionalMemberships.map((m: string, i: number) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
