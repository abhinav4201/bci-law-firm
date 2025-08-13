import {
  getPracticeAreas,
  getProfile,
  getSiteConfig,
} from "@/lib/content-server";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PracticeArea } from "@/lib/types";

export default function Home() {
  const { advocateName } = getSiteConfig();
  const profile = getProfile();
  const practiceAreas = getPracticeAreas().slice(0, 6);

  return (
    <div className='space-y-20'>
      {/* Hero Section */}
      <section className='text-center pt-16 pb-20'>
        <h1
          className='text-4xl md:text-6xl font-extrabold mb-4'
          style={{ color: "var(--color-brand-primary)" }}
        >
          {advocateName}
        </h1>
        <p className='text-lg md:text-xl text-muted max-w-3xl mx-auto'>
          A dedicated legal professional based in Patna, providing comprehensive
          legal services with a commitment to diligence and integrity.
        </p>
      </section>

      {/* About Section */}
      <section
        id='about'
        className='p-10 bg-card rounded-xl border border-border'
      >
        <h2 className='text-3xl font-bold mb-6 text-center'>
          About the Advocate
        </h2>
        <p className='text-lg text-muted leading-relaxed text-center max-w-4xl mx-auto'>
          {profile.biography.substring(0, 250)}...
        </p>
        <div className='text-center mt-8'>
          <Link
            href='/profile'
            className='inline-flex items-center font-semibold transition-colors'
          >
            Read Full Profile <ArrowRight className='ml-2 h-5 w-5' />
          </Link>
        </div>
      </section>

      {/* Practice Areas Section */}
      <section id='practice-areas' className='py-10'>
        <h2 className='text-3xl font-bold mb-10 text-center'>
          Areas of Practice
        </h2>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {practiceAreas.map((area: PracticeArea) => (
            <div
              key={area.slug}
              className='bg-card p-8 rounded-xl border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300'
            >
              <h3
                className='text-2xl font-bold mb-3'
                style={{ color: "var(--color-brand-primary)" }}
              >
                {area.title}
              </h3>
              <p className='text-muted mb-6'>{area.summary}</p>
              <Link
                href={`/practice-areas/${area.slug}`}
                className='font-semibold inline-flex items-center'
              >
                Learn More <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </div>
          ))}
        </div>
        <div className='text-center mt-12'>
          <Link
            href='/practice-areas'
            className='inline-flex items-center font-semibold transition-colors'
          >
            View All Practice Areas <ArrowRight className='ml-2 h-5 w-5' />
          </Link>
        </div>
      </section>
    </div>
  );
}
