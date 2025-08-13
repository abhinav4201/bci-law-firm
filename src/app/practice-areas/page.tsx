import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getPracticeAreas } from "../../lib/content";
import type { PracticeArea } from "../../lib/types";

export default function PracticeAreasPage() {
  const areas = getPracticeAreas();

  return (
    <div>
      <h1 className='text-4xl font-extrabold text-center mb-10'>
        Areas of Practice
      </h1>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {areas.map((area: PracticeArea) => (
          <Link
            href={`/practice-areas/${area.slug}`}
            key={area.slug}
            className='block p-8 bg-[rgb(var(--card-background-rgb))] rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group'
          >
            <h2 className='text-2xl font-bold text-[rgb(var(--brand-secondary-rgb))] mb-3 group-hover:text-[rgb(var(--brand-accent-rgb))] transition-colors'>
              {area.title}
            </h2>
            <p className='text-[rgb(var(--foreground-rgb))] mb-4'>
              {area.summary}
            </p>
            <span className='font-semibold inline-flex items-center text-[rgb(var(--brand-primary-rgb))]'>
              Learn More <ArrowRight className='ml-2 h-4 w-4' />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
