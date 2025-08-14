/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getPracticeAreas,
  getProfile,
  getSiteConfig,
} from "@/lib/content-server";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PracticeArea } from "@/lib/types";
import { ScrollProgressLine } from "@/components/common/ScrollProgressLine";
import DynamicIcon from "@/components/common/DynamicIcon";
import { RecentInsights } from "@/components/RecentInsights"; 

export default function Home() {
  const { advocateName } = getSiteConfig();
  const profile = getProfile();
  const practiceAreas = getPracticeAreas().slice(0, 6);

  return (
    <>
      <ScrollProgressLine />
      {/* ADDED: relative and z-10 to ensure this content is clickable */}
      <div className='relative z-10 space-y-20 md:space-y-32'>
        {/* SECTION 1: HERO */}
        <section className='text-center pt-16 pb-20'>
          <h1 className='text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-b from-brand-primary to-gray-600 text-transparent bg-clip-text'>
            {advocateName}
          </h1>
          <p className='text-lg md:text-xl text-muted max-w-3xl mx-auto'>
            A dedicated legal professional based in Patna, providing
            comprehensive legal services with a commitment to diligence and
            integrity.
          </p>
        </section>

        {/* SECTION 2: ABOUT */}
        <section
          id='about'
          className='py-20 text-white rounded-2xl shadow-lg animated-gradient'
        >
          <div className='container mx-auto px-6 text-center'>
            {/* ADDED: drop-shadow-sm for readability */}
            <h2 className='text-3xl font-bold mb-6 text-white drop-shadow-sm'>
              About the Advocate
            </h2>
            {/* ADDED: drop-shadow-sm for readability */}
            <p className='text-lg text-gray-200 leading-relaxed max-w-4xl mx-auto drop-shadow-sm'>
              {profile.biography.substring(0, 250)}...
            </p>
            <div className='text-center mt-8'>
              <Link
                href='/profile'
                className='inline-flex items-center font-semibold text-brand-accent hover:text-white transition-colors drop-shadow-sm'
              >
                Read Full Profile <ArrowRight className='ml-2 h-5 w-5' />
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 3: PRACTICE AREAS */}
        <section id='practice-areas' className='py-10'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold'>Areas of Practice</h2>
            <p className='text-muted mt-2'>
              Providing expert counsel across a range of legal fields.
            </p>
          </div>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {practiceAreas.map((area: PracticeArea) => (
              <div
                key={area.slug}
                className='group relative bg-card p-8 rounded-xl border border-border shadow-sm transition-all duration-300 hover:border-brand-accent hover:shadow-lg'
              >
                <div className='absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl'></div>
                <div className='relative z-10'>
                  <div className='bg-brand-primary/10 text-brand-primary w-12 h-12 rounded-lg flex items-center justify-center mb-6'>
                    <DynamicIcon name={area.icon as any} size={28} />
                  </div>
                  <h3 className='text-2xl font-bold mb-3 text-brand-primary'>
                    {area.title}
                  </h3>
                  <p className='text-muted mb-8'>{area.summary}</p>

                  {/* CORRECTED LINK AND BUTTON STYLING */}
                  <Link
                    href={`/practice-areas/${area.slug}`}
                    className='inline-block'
                  >
                    <span className='inline-flex items-center font-semibold text-white bg-brand-primary px-4 py-2 rounded-md shadow-sm hover:bg-brand-secondary transition-colors'>
                      Learn More <ArrowRight className='ml-2 h-4 w-4' />
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className='text-center mt-16'>
            <Link
              href='/practice-areas'
              className='inline-flex items-center font-semibold text-brand-accent transition-colors text-lg'
            >
              View All Practice Areas <ArrowRight className='ml-2 h-5 w-5' />
            </Link>
          </div>
        </section>
        {/* NEW SECTION 4: RECENT INSIGHTS */}
        <RecentInsights />
      </div>
    </>
  );
}