import { Mail, MapPin, Phone } from "lucide-react";
import { getSiteConfig } from "../../lib/content-server";

export default function ContactPage() {
  const { contact, disclaimer } = getSiteConfig();

  return (
    <div className='p-8 md:p-12 bg-[rgb(var(--card-background-rgb))] rounded-xl shadow-lg'>
      <h1 className='text-4xl font-extrabold text-center mb-10'>
        Contact Information
      </h1>

      <div className='grid md:grid-cols-2 gap-12'>
        {/* Contact Details */}
        <div className='space-y-6'>
          <div className='flex items-start'>
            <MapPin className='h-8 w-8 text-[rgb(var(--brand-accent-rgb))] mr-4 mt-1 flex-shrink-0' />
            <div>
              <h2 className='text-2xl font-bold'>Chamber Address</h2>
              <p className='text-lg text-[rgb(var(--foreground-rgb))]'>
                {contact.address}
              </p>
            </div>
          </div>
          <div className='flex items-start'>
            <Phone className='h-8 w-8 text-[rgb(var(--brand-accent-rgb))] mr-4 mt-1 flex-shrink-0' />
            <div>
              <h2 className='text-2xl font-bold'>Phone</h2>
              <p className='text-lg text-[rgb(var(--foreground-rgb))]'>
                {contact.phone}
              </p>
            </div>
          </div>
          <div className='flex items-start'>
            <Mail className='h-8 w-8 text-[rgb(var(--brand-accent-rgb))] mr-4 mt-1 flex-shrink-0' />
            <div>
              <h2 className='text-2xl font-bold'>Email</h2>
              <p className='text-lg text-[rgb(var(--foreground-rgb))]'>
                {contact.email}
              </p>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div>
          <iframe
            src={contact.googleMapsUrl}
            width='100%'
            height='350'
            style={{ border: 0 }}
            allowFullScreen={false}
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            className='rounded-lg shadow-md'
          ></iframe>
        </div>
      </div>

      {/* BCI Disclaimer */}
      <div className='mt-12 pt-8 border-t border-gray-200'>
        <h3 className='text-xl font-semibold text-center mb-4'>Disclaimer</h3>
        <p className='text-sm text-center text-gray-500 max-w-4xl mx-auto'>
          {disclaimer}
        </p>
      </div>
    </div>
  );
}
