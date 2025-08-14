import { Mail, MapPin, Phone } from "lucide-react";
import { getSiteConfig } from "@/lib/content-server";
import { ContactForm } from "@/components/ContactForm";
import { CreativeBackground } from "@/components/common/CreativeBackground";

export default function ContactPage() {
  const { contact, disclaimer } = getSiteConfig();

  return (
    <CreativeBackground>
      <div className='p-8 md:p-12'>
        <div className='max-w-7xl mx-auto'>
          <h1 className='text-4xl font-extrabold text-center mb-12 text-brand-primary'>
            Contact & Enquiry
          </h1>

          {/* Section 1: Form and Contact Details Side-by-Side */}
          <div className='grid md:grid-cols-2 gap-12 md:gap-16 items-start'>
            {/* Column 1: Enquiry Form Card */}
            <div className='bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200/50'>
              <h2 className='text-3xl font-bold mb-4 text-brand-primary'>
                Enquiry Form
              </h2>
              <p className='text-muted mb-6'>
                Fill in your details below. We will get in touch with you
                shortly.
              </p>
              <ContactForm />
            </div>

            {/* Column 2: Contact Details */}
            <div className='space-y-8 pt-8'>
              <h2 className='text-3xl font-bold mb-4 text-brand-primary'>
                Contact Details
              </h2>
              <div className='space-y-6'>
                <div className='flex items-start'>
                  <MapPin className='h-6 w-6 text-brand-accent mr-4 mt-1 flex-shrink-0' />
                  <div>
                    <h3 className='text-xl font-bold'>Chamber Address</h3>
                    <p className='text-lg text-muted'>{contact.address}</p>
                  </div>
                </div>
                <div className='flex items-start'>
                  <Phone className='h-6 w-6 text-brand-accent mr-4 mt-1 flex-shrink-0' />
                  <div>
                    <h3 className='text-xl font-bold'>Phone</h3>
                    <p className='text-lg text-muted'>{contact.phone}</p>
                  </div>
                </div>
                <div className='flex items-start'>
                  <Mail className='h-6 w-6 text-brand-accent mr-4 mt-1 flex-shrink-0' />
                  <div>
                    <h3 className='text-xl font-bold'>Email</h3>
                    <p className='text-lg text-muted'>{contact.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Map */}
          <div className='mt-16'>
            <h2 className='text-3xl font-bold mb-4 text-brand-primary text-center'>
              Our Location
            </h2>
            <iframe
              src={contact.googleMapsUrl}
              width='100%'
              height='400'
              style={{ border: 0 }}
              allowFullScreen={false}
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              className='rounded-lg shadow-md'
            ></iframe>
          </div>

          {/* BCI Disclaimer */}
          <div className='mt-16 pt-8 border-t border-border'>
            <h3 className='text-xl font-semibold text-center mb-4'>
              Disclaimer
            </h3>
            <p className='text-sm text-center text-muted max-w-4xl mx-auto'>
              {disclaimer}
            </p>
          </div>
        </div>
      </div>
    </CreativeBackground>
  );
}
