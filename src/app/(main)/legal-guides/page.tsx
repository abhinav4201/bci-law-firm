import { getPosts } from "@/lib/content";
import { GuideList } from "@/components/GuideList"; // --- IMPORT the new client component ---

export const revalidate = 3600;

export default async function LegalGuidesPage() {
  const guides = await getPosts("guide");

  return (
    <div className='max-w-4xl mx-auto'>
      <h1 className='text-5xl font-extrabold text-center mb-12 text-brand-primary'>
        Legal Guides & Resources
      </h1>
      <p className='text-center text-lg text-muted mb-12'>
        In-depth articles and guides to help you understand complex legal
        topics.
      </p>

      {/* --- USE the new client component --- */}
      <GuideList initialGuides={guides} />
    </div>
  );
}
