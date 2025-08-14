/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPracticeAreas } from "@/lib/content-server";
import type { PracticeArea } from "@/lib/types";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import DynamicIcon from "@/components/common/DynamicIcon";

export default function PracticeAreasPage() {
  const areas = getPracticeAreas();

  return (
    <div>
      <div className='text-center mb-16'>
        <h1 className='text-4xl font-extrabold'>Areas of Practice</h1>
        <p className='text-muted mt-2 text-lg'>
          Providing counsel across a wide range of legal fields in Patna.
        </p>
      </div>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {areas.map((area: PracticeArea) => (
          <div
            key={area.slug}
            className='group relative bg-card p-8 rounded-xl border border-border shadow-sm transition-all duration-300 hover:border-brand-accent hover:shadow-lg'
          >
            <div className='absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl'></div>

            <div className='relative z-10 flex flex-col h-full'>
              <div className='bg-brand-primary/10 text-brand-primary w-12 h-12 rounded-lg flex items-center justify-center mb-6 flex-shrink-0'>
                <DynamicIcon name={area.icon as any} size={28} />
              </div>

              <div className='flex-grow'>
                <h2 className='text-2xl font-bold mb-3 text-brand-primary'>
                  {area.title}
                </h2>
                <p className='text-muted mb-8'>{area.summary}</p>
              </div>

              <div className='mt-auto'>
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
          </div>
        ))}
      </div>
    </div>
  );
}
