import { getSiteConfig } from "@/lib/content-server";

export default function DisclaimerPage() {
  const { disclaimer } = getSiteConfig();

  return (
    <div className='max-w-4xl mx-auto p-8 bg-card rounded-xl shadow-lg'>
      <h1 className='text-4xl font-extrabold text-center mb-8 text-brand-primary'>
        Disclaimer
      </h1>
      <div className='prose prose-lg max-w-none text-foreground leading-relaxed'>
        <p>{disclaimer}</p>
        <p>
          This website is a resource for informational purposes only and is
          intended, but not promised or guaranteed, to be correct, complete, and
          up-to-date. The Bar Council of India does not permit advertisement or
          solicitation by advocates in any form or manner.
        </p>
        <p>
          By accessing this website, you acknowledge and confirm that you are
          seeking information relating to the advocate of your own accord and
          that there has been no form of solicitation, advertisement or
          inducement by the advocate or any of its members.
        </p>
        <p>
          The content of this website is for informational purposes only and
          should not be interpreted as soliciting or advertisement. No
          material/information provided on this website should be construed as
          legal advice. The advocate shall not be liable for any consequences of
          any action taken by relying on the material/information provided on
          this website.
        </p>
      </div>
    </div>
  );
}
